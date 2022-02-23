import React from "react";
//import ReactDOM from "react-dom";
//import ReactHtmlParser from "react-html-parser";
//import reactElementToJSXString from "react-element-to-jsx-string";
//import ReactDOMServer from "react-dom/server";
import ExecutionEnvironment from "exenv";

/*class Forward extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return <div ref={this.props.fwdtwe} />;
  }
}*/

class Cable extends React.Component {
  constructor(props) {
    super(props);
    this.state = { limit: [], cache: null, mountsCount: 0, cacheStyle: "" };
    this.page = React.createRef();
    this.fwdtwe = React.createRef();
  }
  componentDidMount() {
    if (ExecutionEnvironment.canUseDOM) {
      this.setState({ go: true }, () => this.checkIfBetween());
    }
  }
  componentDidUpdate = (prevProps) => {
    if (this.state.go && this.props.scrolling !== prevProps.scrolling) {
      this.checkIfBetween();
    }
    if (this.state.loaded !== this.state.lastLoaded) {
      this.setState(
        {
          lastLoaded: this.state.loaded
        },
        this.checkIfBetween
      );
    }
  };
  componentWillUnmount = () => {
    clearTimeout(this.setset);
  };
  checkIfBetween = () => {
    const { frameheight, cache } = this.state;
    const { scrollTopAndHeight, scrollTop, girth, timeout } = this.props;
    var girt =
      girth && !isNaN(girth)
        ? girth + 500
        : frameheight
        ? frameheight
        : this.props.style &&
          this.props.style.height &&
          !isNaN(this.props.style.height)
        ? this.props.style.height + 500
        : 500;
    var timeou = timeout ? timeout : 1500;
    clearTimeout(this.setset);
    this.setset = setTimeout(() => {
      var page = this.page.current;
      var between =
        page.offsetTop - scrollTop > Number(`-${girt}`) &&
        scrollTopAndHeight - page.offsetTop > Number(`-${girt}`);
      //console.log(page.offsetTop);
      if (!this.state.mount) {
        //console.log(between, page.offsetTop, scrollTop);
        /*between && */ this.setState({ mount: between }, () => {});
      } else {
        var continuee = this.props.fwd.current;
        //between && console.log(between, continuee.outerHTML);
        if (!continuee && !cache) return;
        /*const cacheStyle = JSON.parse(
          (cache ? cache : continuee.outerHTML)
            .split(`style="`)[1]
            .split(`"`)[0]
            .replaceAll(";", `",`)
            .replaceAll(": ", `: "`)
        );*/
        //console.log(cacheStyle);
        //console.log(cache, continuee.offsetHeight, continuee.offsetWidth);
        if (!cache && (this.state.loaded || this.props.img)) {
          //if (continuee.offsetHeight !== 0)
          this.setState({
            cache: continuee.outerHTML,
            //cacheStyle,
            frameheight: continuee.offsetHeight,
            framewidth: continuee.offsetWidth
          });
        } else if (!between) {
          //console.log("!between", continuee.outerHTML);
          /* if (continuee) {
                
                const children = [...continuee.children];
                console.log(children);
                if (children.length > 0) {
                  var gl = null;
                  const foun = children.find(
                    (x) => (gl = x.getContext("webgl"))
                  );
                  foun.addEventListener(
                    "webglcontextlost",
                    (e) => console.log(e),
                    false
                  );
                  gl.getExtension("WEBGL_lose_context").loseContext();
                }
              }*/
          //continuee.remove();
          //if (scrollTop !== 0) return;
          //continuee && continuee.remove();

          if (continuee) {
            while (continuee.children.length > 0) {
              continuee.remove(
                continuee.children[continuee.children.length - 1]
              );
            }
          }
          //      console.log(girt);
          //if (Object.keys(page.children).length !== 0 /*page.innerHTML !== ""*/)
          //return (page.innerHTML = "");
          // this.setState({ mount: false });
        } else if (page.innerHTML === "") {
          console.log("reloading");
          const children = [...page.children];
          if (
            cache &&
            (children.length === 0 || !children.find((x) => x === cache))
          ) {
            //console.log("replenishing, new scroll", cache);
            return (page.innerHTML = this.state.cache);
          }
        }
      }
    }, timeou);
  };
  render() {
    const { mount /*, cacheStyle */ } = this.state;
    const { src, float, title, img } = this.props;
    //const limited = limit.find((x) => x === Object.keys(this.props.fwd));
    const onError = (e) => {
      //this.props.fwd.current.remove();
      this.props.onError(e);
    }; //ternaries remove the node and element; display removes the element, but not the node
    //const parsedStyle = JSON.parse(`{ ${cacheStyle} }`);
    const onLoad = (e) => {
      console.log("loaded");
      this.setState({
        loaded: true
      });
    };
    const optionalwidth =
      (this.state.img || this.state.loaded) && this.state.framewidth
        ? this.state.framewidth
        : this.props.style && this.props.style.width // &&
        ? //!isNaN(this.props.style.width)
          this.props.style.width
        : "200px";
    const optionalheight = this.state.height
      ? this.state.height
      : this.props.style && this.props.style.height // &&
      ? //!isNaN(this.props.style.width)
        this.props.style.height
      : "min-content";
    //console.log(optionalwidth);
    return (
      <div
        ref={this.page}
        style={{
          //width: this.state.framewidth,
          //...this.props.style,
          overflowX: "auto",
          shapeOutside: "rect()",
          float,
          height: this.state.frameheight
            ? this.state.frameheight + 10
            : "max-content",
          //width: optionalwidth,
          maxWidth: "100%",
          minWidth: optionalwidth // "max-content"
        }}
      >
        {/*<div
          style={{
            width: "200px"
            //...this.props.style
          }}
        >*/}
        {src === "" || (!img && !mount) ? (
          <span style={{ border: "2px gray solid" }}>{title}</span>
        ) : img ? (
          <img
            //onLoad={onLoad}
            onError={onError}
            alt={title}
            style={{
              //width: "100%",
              border: src === "" ? "2px gray solid" : 0,
              height: optionalheight,
              minWidth: optionalwidth, // "max-content"
              ...this.props.style
            }}
            ref={this.props.fwd}
            src={src}
          />
        ) : (
          <iframe
            onLoad={onLoad}
            onError={onError}
            title={title}
            style={{
              //width: "100%",
              border: 0,
              height: optionalheight,
              width: optionalwidth, // "max-content"
              ...this.props.style
            }}
            ref={this.props.fwd}
            src={src}
          />
        )}
      </div>
    );
  }
}
export default React.forwardRef((props, ref) => <Cable fwd={ref} {...props} />);

/**
 * 
      const { cache } = this.state;
      const { scrollTopAndHeight, scrollTop, girth, timeout } = this.props;
      var girt = girth ? girth : 1000;
      var timeou = timeout ? timeout : 1500;
      var continuee = this.props.fwd.current;
      clearTimeout(this.setset);
      this.setset = setTimeout(() => {
        var page = this.page.current;
        var between =
          page.offsetTop - scrollTop > Number(`-${girt}`) &&
          scrollTopAndHeight - page.offsetTop > Number(`-${girt}`);
        this.setState({ mount: this.state.mount ? this.state.mount : between });
        if (!continuee && !cache) return;
        //if (!continuee) continuee = cache;
        //const clone = continuee; //React.cloneElement(continuee);
        this.setState({
          //ReactDOMServer.renderToStaticMarkup, reactElementToJSXString
          //is just html object
          cache: cache ? cache : continuee.outerHTML
        });
        if (!between && continuee) {
          //while (page.firstChild) {
          //page.removeChild(continuee);
          //console.log(continuee.parentNode);
          //console.log(page);
          page.innerHTML = "";
          //continuee.parentNode && page.removeChild(continuee);
          //ReactDOM.unmountComponentAtNode(page); //ReactDOM.findDOMNode(this).parentNode
          //while (page.firstChild) {
          //let onClick =
          //"ontouchstart" in continuee ? "touchstart" : "onclick";
          //if (continuee[onClick]) continuee.remove(); //touchevent
          //continuee.click();
          //}
          //continuee.parentNode.removeChild(continuee);
          return;
        }
        //if (!between && continuee) return continuee.remove();
        const children = [...page.children];
        const d = children.find((x) => x === this.state.cache);
        // console.log(children);
        if (
          children.length === 0 ||
          !d
          //children[children.length - 1] !== this.state.cache
        ) {
          /*page.innerHTML = React.forwardRef((props, ref) => (
              <Forward fwdtwe={ref} {...props} />
            ));*
          //console.log(page);
          //console.log(this.state.cache);
          var cach = this.state.cache;
          /**renderToStaticMarkup over renderToString as it does not add any extra DOM attributes that React uses internally, like `data-reactroot: */
/*const namer = cache.getAttribute("alt") ? "alt" : "title";
              cach.setAttribute(
                namer,
                cache.getAttribute(namer) + this.state.mountsCount
              );*/
/*const img = cach.split(`alt="`)[1];
                const namer = img
                  ? cach.split(`alt="`)[1].split(`"`)[0]
                  : cach.split(`title="`)[1].split(`"`)[0];
                cach =
                  cach.substring(0, img ? 10 : 15) +
                  namer +
                  this.state.mountsCount +
                  cach.substring(
                    cach.indexOf(namer) + namer.length,
                    cach.length
                  );*
          page.innerHTML = cach; //<div>{cache}</div>;
          //new DOMParser().parseFromString(cach, "text/html")
          //ReactDOM.render(cach, page);
          //ReactDOM.render(ReactHtmlParser(cach), page);
          this.setState({ mountsCount: this.state.mountsCount + 1 });
          //page.appendChild(cache);
          //console.log(page);
        }
      }, timeou);
 */

/**
  * const Render = () => {
  useEffect(() => {
    const handler = event => {
      const data = JSON.parse(event.data)
      console.log("Hello World?", data)
    }
    window.addEventListener("message", handler)
    // clean up
    return () => window.removeEventListener("message", handler)
  }, []) // empty array => run only once
  return (
    <div>
      <iframe
        srcDoc={`
        <!DOCTYPE html>
        <html>
          <head>
            window.top.postMessage(
              JSON.stringify({
                error: false,
                message: "Hello World"
              }),
              '*'
            );
          </head>
          <body>
            <h1>Content inside an iframe, who knew...</h1>
          </body>
        </html>
      `}
      />
    </div>
  )
}
  */
