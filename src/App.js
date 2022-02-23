import React from "react";
import Doc from "./Doc.js";
import Cable from "./Dropwire.js";
import firebase from "./init-firebase.js";
import TwitterTweetEmbed from "./TwitterTweetEmbed";
import { UAParser } from "ua-parser-js";
import "./styles.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    var parser = new UAParser();
    const name = parser.getBrowser().name;
    this.state = {
      browser: name,
      ios: name.includes("Safari"),
      iosnoPhoto: name.includes("Safari"),
      signatures: 0,
      first: "",
      middle: "",
      last: "",
      address: "",
      city: "",
      zip: "",
      scrollTop: 0
    };
    this.primary = React.createRef();
    this.thumbprint = React.createRef();
    this.videos = React.createRef();
    for (let i = 0; i < 220; i++) {
      this["scrollImg" + i] = React.createRef();
    }
  }
  componentDidMount = () => {
    firebase
      .firestore()
      .collection("countData")
      .doc("only")
      .onSnapshot((doc) => {
        if (doc.exists) {
          var foo = doc.data();
          foo.id = doc.id;
          this.setState({ signatures: foo.count });
        }
      });
    window.addEventListener("scroll", this.handleScroll);
  };
  componentWillUnmount = () => {
    window.removeEventListener("scroll", this.handleScroll);
  };
  handleScroll = (e) => {
    if (!this.state.offScroll) {
      const scrollTop = window.scrollY;
      this.setState(
        {
          scrolling: true,
          scrollTop
        },
        () => {
          clearTimeout(this.scrollTimeout);
          this.scrollTimeout = setTimeout(() => {
            this.setState({
              scrolling: false
            });
          }, 900);
        }
      );
    }
  };
  handleSubmit = (e) => {
    e.preventDefault();
    if (
      this.state.first !== "" &&
      this.state.last !== "" &&
      this.state.address !== "" &&
      this.state.city !== "" &&
      this.state.zip !== ""
    ) {
      /*console.log("do");
      firebase
        .firestore()
        .collection("signatures")
        .where("first", "==", this.state.first)
        .where("middle", "==", this.state.middle)
        .where("last", "==", this.state.last)
        .where("address", "==", this.state.address)
        .where("city", "==", this.state.city)
        .where("zip", "==", this.state.zip)
        .get()
        .then((doc) => {
          if (doc.exists) {
            window.alert("you've signed! 🎉");
          } else {*/
      firebase
        .firestore()
        .collection("signatures")
        .add({
          first: this.state.first,
          middle: this.state.middle,
          last: this.state.last,
          address: this.state.address,
          city: this.state.city,
          zip: this.state.zip
        })
        .then(() => {
          this.setState({ finished: true });
          firebase
            .firestore()
            .collection("countData")
            .doc("only")
            .get()
            .then((doc) => {
              if (doc.exists) {
                firebase
                  .firestore()
                  .collection("countData")
                  .doc("only")
                  .update({
                    count: firebase.firestore.FieldValue.increment(1)
                  });
              } else {
                firebase
                  .firestore()
                  .collection("countData")
                  .doc("only")
                  .set({
                    count: firebase.firestore.FieldValue.increment(1)
                  });
              }
            })
            .then(() => {
              window.alert("you've signed! 🎉");
              this.setState({ finished: true });
            })
            .catch((err) => {
              console.log(err.message);
              this.setState({ finished: true });
            });
        });
    } else
      return window.alert(
        "please complete required fields, all except middle name"
      );
  };

  componentDidUpdate = (prevProps) => {
    if (this.props.pathname !== prevProps.pathname) {
      clearTimeout(this.check);
      const check = () => {
        if (this.props.pathname === "/") {
          this.setState({ journal: true });
        } else if (this.props.pathname === "/thumbprint") {
          window.scroll(0, this.thumbprint.current.offsetTop);
        } else if (this.props.pathname === "/videos") {
          window.scroll(0, this.videos.current.offsetTop);
        } else if (this.props.pathname === "/primary") {
          window.scroll(0, this.primary.current.offsetTop);
        }
      };
      check();
      this.check = setTimeout(check, 4000);
    }
  };
  render() {
    const handleScollImgError = (e) => {
      if (e.message) {
        console.log(e.message);
        this.setState({ iosnoPhoto: true });
      }
    };
    return (
      <div
        style={{
          position: "relative",
          overflow: "hidden",
          width: "100%",
          maxWidth: "600px",
          fontFamily: "sans-serif",
          textAlign: "center"
        }}
      >
        <div
          onClick={(e) => this.setState({ journal: !this.state.journal })}
          style={{
            transition: `${this.state.journal ? 0.5 : 0.2}s ease-in`,
            border: "1px solid",
            borderRadius: "15px",
            padding: "10px",
            margin: "10px",
            backgroundColor: "white",
            display: "flex",
            position: "fixed",
            width: "calc(100% - 42px)",
            fontFamily: "sans-serif",
            justifyContent: this.state.scrollTop === 0 ? "center" : "flex-end"
          }}
        >
          {!this.state.journal ? "journal" : "plan"}
        </div>
        <br />
        <br />
        <br />
        <br />
        <div
          style={{
            overflow: "hidden",
            backgroundColor: "white",
            height: !this.state.journal ? "0px" : "",
            position: !this.state.journal ? "fixed" : "relative",
            width: "100%",
            maxWidth: "600px",
            fontFamily: "sans-serif",
            textAlign: "center"
          }}
        >
          <h2>Maybe the money is good will.</h2>
          (cash/debt)*income every year back don't cancel (tuition kept, nor
          Savers' share-split bailout, laborless-demand). Reverse amortization,
          then max-royalty, banked equities concurrentable and truncated
          production tax... Finally, cap rent by 5 storefronts+condominiums, 5
          auto liens, or 30 days
          <br />
          <br />
          use industry-variable jury to find implausible use intent, impossible
          or forseeable, or donee invoked surrendered freedom, liable
          contractor: redundant estimate hazard, false-bid-pool
          {/*'name-yoour-price'*/}.
        </div>
        <div
          style={{
            overflow: "hidden",
            backgroundColor: "white",
            height: this.state.journal ? "0px" : "",
            position: this.state.journal ? "fixed" : "relative",
            width: "100%",
            maxWidth: "600px",
            fontFamily: "sans-serif",
            textAlign: "center"
          }}
        >
          <a
            style={{
              shapeOutside: "rect()",
              float: "right",
              width: "max-content",
              padding: "0px 10px",
              fontSize: "20px",
              fontFamily: "'Pacifico', sans-serif",
              color: "rgb(230,230,255)",
              backgroundColor: "rgb(32, 22, 11)"
            }}
            href="https://humanharvest.info/polio"
          >
            humanharvest.info
          </a>
          "Beleagured self-employed want relief from $12k/64 debt/cash
          impossible Hell. Hard left have acheived huge influence in our
          educational institutions (trust-built-redistribution) and basic facts
          of microbiology and taxonomiology, the hard left have had only what
          they could dream of: effectively, a planned economy, a template of
          endless state dependence, all at hysterical, eyewatering costs." Mark
          Dolan.
          <br />
          Drain the swamp does not mean debt haha but judges. Repatriate
          industry by banning finance, laborless-demand; econ-welfare is
          GDP/hours-GDP/p, no?$
          <br />
          <br />
          “Audit paper elections from outside entities of choice, like public
          companies do when they file financial reports, to which retail doesn’t
          need to to keep the 1987c options market alive, doesn’t actually
          ensure all votes are counted.” David Purdue and Greg Kelly.{" "}
          <a href="https://thumbprint.us/voting">
            You cannot trust the count, still
          </a>
          .
          <br />
          <br />
          Market history scholar, propagandist, statistician: The Great Leap
          Forward expected 15m 35 age&nbsp;
          <a href="https://humanharvest.info/polio">lifetime</a>
          &nbsp;deaths.
          <br />
          <br />
          forensic audits, not the bullshit audits, you cannot audit magnetic
          data.
          <h1>
            bottom left&nbsp;
            <a href="https://saverparty.xyz/thumbprint">
              <span role="img" aria-label="squirrel bottom-left white-circle">
                🐿↙️⚪️
              </span>
            </a>
          </h1>
          <h2>
            election is a fraud, honor system signature grounds' standing is
            fraud as hospitalizations and deaths are insignificant year to year
          </h2>
          "13 hours of jury-duty is agonizing," they take pioneering experts off
          the jury, defeating the industry variable purpose.
          <br />
          <br />
          <Cable
            style={{ height: "300px" }}
            onError={handleScollImgError}
            src={
              this.state.nofred
                ? ""
                : "https://drive.google.com/file/d/1y87dUUVZTXVJM32miGDqbXE6OEk9hfek/preview"
            }
            float="right"
            title=""
            scrolling={this.state.scrolling}
            fwd={this["scrollImg" + 52]}
            scrollTopAndHeight={this.state.scrollTop + window.innerHeight}
            scrollTop={this.state.scrollTop}
          />
          “Economic growth, everyone is looking for the American dream like
          Reagan and Clinton for a little bit, until the big bubble burst.
          Hispanics want to buy homes send kids to private schools do what we
          want to do that’s why so many people like anyway.”
          <br />
          Leftwing socialist communist, socialist democrats want to control our
          live," isn't expriing claims controlling my life of loitered
          collaterol and insurer work deficit?
          <br />
          hee haw
          <br />
          chupacabra
          <br />
          <a href="https://micro-theory.com">prude</a>
          <br />
          <br />
          “Marx used the word, ‘peasantry,' to bring in people, as poor as they
          can," they can do the work, but the right wants to for keeping their
          union, “…indoctrination public school. "Hispanics want prosperity, job
          growth, and economic growth, so it is not going to work. Alright Feliz
          Navidadez, gentlemen."
          <br />
          <br />
          $32/day/p new debt private 2/3 public
          <h2>
            3m/yr+ 6m/40m immigrants can be, "legalized," 6m/40m
            unemployed-by-10-year-cohort, 1/3 non-voters won and simply in
            guber.
            <br />
            <span
              style={{
                fontSize: "9px"
              }}
            >
              anti-rent-seeker not accounted for cash:debt*income thru history,
              don't FREAK OUT
            </span>
          </h2>
          "What biden was elected to do, to get people to work and give them
          breathing room, but Biden has all intentions to run in 2024, that
          would be the final mention for them."
          <br />
          <h2>
            trump mortality projection + honor system signatures == ppp trust
            building existing biz (free rider mutable 1/4 1/4 1/4 sewage police
            lawsuits 10% debt service)
          </h2>
          <div
            style={{
              backgroundColor: "black",
              color: "white",
              padding: "10px",
              margin: "10px",
              borderRadius: "15px"
            }}
          >
            <Cable
              onError={handleScollImgError}
              src={
                this.state.nofred
                  ? ""
                  : "https://drive.google.com/file/d/1jyedtvbhxYnSg0d7oeWg9MTTe23bwXgb/preview"
              }
              float="right"
              title="Grant Stinchfield (Newsmax) - Brian Maste on mandates for military"
              scrolling={this.state.scrolling}
              fwd={this["scrollImg" + 51]}
              scrollTopAndHeight={this.state.scrollTop + window.innerHeight}
              scrollTop={this.state.scrollTop}
            />
            <a
              style={{
                shapeOutside: "rect()",
                float: "left",
                width: "max-content",
                padding: "0px 10px",
                fontSize: "20px",
                fontFamily: "'Pacifico', sans-serif",
                color: "white"
              }}
              href="https://truncatedsalestax.com"
            >
              truncatedsalestax.com
            </a>
            "reckless guess in order to trick you into compliance, overreach
            intrusion by government. Vaccine status lists private information
            can be weaponized against the people. 80 republicans in the house
            voted for this what are they thinking? 1.5 1000 rate of 69.2 vaxxed,
            severse cases 2x than vaxxed. natural immunity is real, and likely
            apat from the vaxx," stinch my man, that would imply null hypothesis
            is not natural. "they are going to do the same thing to civilians as
            the military, it is a violation of our civil rights. it is not can
            they, it is they want to wash conservatives out of government. You
            are self-identifying as conservative in most of these cases., they
            can use this to wash a generation of conservatives in government,
            ...deepening the swamp now. I congradulate these people throwing
            their hands up against Mark Meadows. That trumpo was going after the
            facts." under duress for employment, they are trying to excuse
            weening off of net loss bond income
            <br />
            <br />
            <Cable
              onError={handleScollImgError}
              src={
                this.state.nofred
                  ? ""
                  : `https://drive.google.com/file/d/1aabGNhYOyQWrKct2xwAGFlH6G7ffoc-G/preview`
              }
              float="left"
              title="greg Kelly (Newsmax) - "
              scrolling={this.state.scrolling}
              fwd={this["scrollImg" + 50]}
              scrollTopAndHeight={this.state.scrollTop + window.innerHeight}
              scrollTop={this.state.scrollTop}
            />
            <Cable
              style={{
                width: "100%",
                height: "560px",
                backgroundColor: "black"
              }}
              onError={handleScollImgError}
              src={
                this.state.nofred
                  ? ""
                  : `https://fred.stlouisfed.org/graph/graph-landing.php?g=K4YV&width=670&height=475`
              }
              float="right"
              title="https://fred.stlouisfed.org/graph/?g=K4YV"
              scrolling={this.state.scrolling}
              fwd={this["scrollImg" + 37]}
              scrollTopAndHeight={this.state.scrollTop + window.innerHeight}
              scrollTop={this.state.scrollTop}
            />
            <Cable
              style={{
                width: "100%",
                height: "560px",
                backgroundColor: "black"
              }}
              onError={handleScollImgError}
              src={
                this.state.nofred
                  ? ""
                  : `https://fred.stlouisfed.org/graph/graph-landing.php?g=K4YC&width=670&height=475`
              }
              float="right"
              title="https://fred.stlouisfed.org/graph/?g=K4YC"
              scrolling={this.state.scrolling}
              fwd={this["scrollImg" + 37]}
              scrollTopAndHeight={this.state.scrollTop + window.innerHeight}
              scrollTop={this.state.scrollTop}
            />
            “This is the only full earth picture taken in 1967,”
            <br />
            <br />
            Thanks for all you do, my landlord lender and insurer will be happy.
            <br />
            People commit crimes because cops don’t get paid by those they
            arrest.
            <br />
            “We still question moon, but those who exploit those questions, that
            is the problem.”
            <br />
            <br />
            In a home-contractor household, scope-creep in partially-paid
            estimates & repo-cycle kept-down-payments was mad. So, I studied
            market history & propaganda at JHU, then designed my own political,
            election & court tech, and started coding in May 2019, when ReactJs
            videos were prevalent, only studying Java with no real world
            application in Introduction to Computer Science at MU, after 7 years
            of part-time user research testing & Wireframe-Waterfall product
            discovery & design. Since then, I’ve made double digit websites with
            mostly epiological (basis-rate) research (froth.app) and two apps
            (book.com.co), with maps, a chat, on device-end to end encryption I
            am finishing up… (wavv.art) many fetch api’s, serverless node.js, as
            needed (I don’t need it). In fact, I’m working with on my own
            JavaScript bundler now to make my own paytech
            (GitHub.com/nickcarducci/mastercard-backbank), seemingly the only
            way to boycott credit as income in my Ticketmaster competitor,
            thumbprint.us/videos
            <br />
            <a
              href="https://pineapple-mint.com"
              style={{
                borderRadius: "15px",
                fontSize: "30px",
                display: "flex",
                position: "relative",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                height: "76px",
                backgroundColor: "rgb(218, 198, 90)",
                color: "rgb(200, 100, 100)"
              }}
            >
              pineapple-mint.com
            </a>
          </div>
          <br />
          They Match the dollars to what people spend per year! $6k/year/p ==
          $6k/p total, velocity of m2 (bonds+cash, not debt, of differing
          principle shown to bank "investors," beyond 1-level-board max profit
          royalty&nbsp;
          <a href="https://vaults.biz">
            debt-free banking and partnership stewardship
          </a>
          &nbsp;Consumer Relationship Management without scope creep
          suceptibility (
          <a href="https://scopes.cc">
            timeclock unlock by material and labor sprint payment
          </a>
          ), that which I have felt as a home-contractor household and a
          contractor for scopes of requirements with the statement,
          <h2>"sure, I can do that for $40k"</h2>)
          <br />
          <br />
          Don’t count intermediate labor but labor as a good thing, don’t count
          hours and price as productivity but upside down (economics demoted to
          poli sci for this), don’t count assets by bonds nor homes in inflation
          nor gini either, but court-back them like that are.
          <br />
          <a
            style={{
              shapeOutside: "rect()",
              float: "left",
              width: "max-content",
              padding: "0px 10px",
              fontSize: "20px",
              fontFamily: "'Pacifico', sans-serif",
              color: "rgb(230,230,255)",
              backgroundColor: "rgb(32, 22, 11)"
            }}
            href="https://micro-theory.com"
          >
            micro-theory.com
          </a>
          <br />
          Banks should be depositary that means concurrentable the meaning of
          currency. Since new m2 is $8/day/p and $32/day/p debt, banks must be
          showing a lower principal to their investors than they do to their
          loitering and laundering borrowers already, before the foreclosure
          cycle kept down payments third party beneficiary donee claimable.
          <br />
          What is the difference between debt, bonds & money, what they show the
          borrower, the lender, and what we ACTUALLY trade.
          <br />
          <br />
          hours per home doubles every 5 years while gdp/p 1800-1913 was nearly
          constant, albeit still repo-cycle kept-down payments; 5x hours per
          worker and 2x workers per person sinced 1970 for 10x hours per home;
          half continuing claims 2.8m/170m employed, 6m/40m vs 6m/20m 1970
          unemployed, most disability and 20x/millennial rental-income by
          implausible landlord use, corporate collective flaccid loss,
          expiring-claims false bid pools & invoices, all third party
          beneficiary donee claimable and amenable by cash:debt*income thru
          history, to pay for collateral otherwise kept downpayments upon repo
          loitered and laundered what would have been the price and cost for
          intermediate labor and materials without debt:cash inelasticity of
          bid-to-ask appraised beyond actual-capability of the signatory,
          classic surrendering of assets not theirs, counterfeit or fractional
          reserve in contract, let alone share-split. If you cannot cash out
          concurrently, it is as good as not being able to settle collateral at
          once corrected for resale price by returning the down payments upon
          repo, or amortize principal by cash:debt*income thru history, nor
          otherwise, "cash out," as currency, albeit dissolves to public parks,
          is like a depositary certificate on what is already on the market,
          albeit changing meaning that a real depositary without right-wing
          finance would entail.
          <br />
          <br />
          ppp ccc bbb trust building existing-biz parents contractors
          <br />
          <a
            style={{
              shapeOutside: "rect()",
              float: "right",
              width: "max-content",
              padding: "0px 10px",
              fontSize: "20px",
              fontFamily: "'Pacifico', sans-serif",
              color: "rgb(230,230,255)",
              backgroundColor: "rgb(32, 22, 11)"
            }}
            href="https://nationalsecuritycasino.com"
          >
            nationalsecuritycasino.com
          </a>
          new grounds livelihood when cops follow countervailing laws.
          <br />
          <a href="https://30under5.us">Homelessness</a>&nbsp;is because
          implausible&nbsp;
          <a href="https://fred.stlouisfed.org/graph/?g=H5XB">landlord</a>
          &nbsp;use and third party beneficiary donee claimable
          criminality-neglegence. tech adv should be decreasing hours per home
          over time, not&nbsp;
          <a href="https://fred.stlouisfed.org/graph/?g=Gkvt">doubling</a>
          &nbsp;every 5 years nor is it because population growth labor
          competition. "You just want to be safe in our communities.&nbsp;
          <a href="https://thumbprint.us/voting">That is all we want</a>."
          <br />
          <br />
          Riverview literally lied about me to make money on net loss&nbsp;
          <a href="https://truncatedsalestax.com">incarceration</a>&nbsp;by AND
          for saying by non-rollover insurance/expiring claims/false bid
          pools/inherent collective loss laundering/insurer work deficit.
          <br />
          <br />
          <Cable
            onError={handleScollImgError}
            src={
              this.state.iosnoPhoto
                ? ""
                : `https://drive.google.com/file/d/16UVgf_iGq00VN20XGq0GQRNjlvvcfMn4/preview`
            }
            float="left"
            title="National Report (Newsmax) - Shaun Kraisman and "
            scrolling={this.state.scrolling}
            fwd={this["scrollImg" + 36]}
            scrollTopAndHeight={this.state.scrollTop + window.innerHeight}
            scrollTop={this.state.scrollTop}
          />
          “Taiwan is a friend, they manufacture things for us,” Ralph Norman
          <br />
          Still, get closer, but not for their money give up equity as long as
          design and discovery is the extend of broadness for copyrights.
          <br />
          “Pay raises for the troops,&nbsp;
          <a href="https://fred.stlouisfed.org/graph/?g=JE8F">how</a>&nbsp;can
          you disagree with&nbsp;
          <a href="https://truncatedsalestax.com">that</a>?”
          <h2>I don't think you have a case</h2>
          1.2m/yr+ (55m/yr+ worldwide) excess deaths age standardized by cohort
          gains expected is more than&nbsp;
          <a href="https://www.nursinghomeabusecenter.com/blog/covid-nursing-home-deaths/">
            169k
          </a>
          &nbsp;lot.
          <br />
          <Cable
            style={{ height: "440px" }}
            onError={handleScollImgError}
            src={
              this.state.iosnoPhoto
                ? ""
                : `https://drive.google.com/file/d/17iEzaldHCdrqyRGr3PkhKjBneThQ27Is/preview`
            }
            float="right"
            title="Bernie and Sid (77WABC) - Patricia is a stay-at-home-mom who is against truncated sales tax, for lender and tax enjoyer work deficit by 40% debt spending. I called in to say this to his attorney claiming excess deaths weren't expected"
            scrolling={this.state.scrolling}
            fwd={this["scrollImg" + 36]}
            scrollTopAndHeight={this.state.scrollTop + window.innerHeight}
            scrollTop={this.state.scrollTop}
          />
          Actually bottom considering occupy-wall-st popularity, but bottom-left
          because libertariansare hypocrites.
          <br />
          <a href="https://fred.stlouisfed.org/graph/?g=C6m9">Maybe</a>&nbsp;the
          nursing home torts can bailout your&nbsp;
          <a href="https://fred.stlouisfed.org/graph/?g=JEcT">bonds</a>, Sid.
          <br />
          <br />I am going to punt my&nbsp;
          <a href="https://fred.stlouisfed.org/graph/?g=JEdb">Nobel</a>
          <h2>Trump is racist against the supply chain solution</h2>
          <TwitterTweetEmbed
            style={{ float: "left", width: "300px" }}
            key="1428312309685002241"
            tweetId="1428312309685002241" //1391836586707496962//1434568443496370179
          />
          "Some of my worst enemies are so insightful, I have no beef, qualm,
          nor quarrel,” Greg Kelly, that means you are dumb.
          <br />
          <br />
          Brian Kilmeade: “Not antivaxx, but pro anti mandate,” you are for
          national security or not? Either the vaxx works or it doesn’t, and if
          it doesn’t, it only does&nbsp;
          <a href="https://humanharvest.info">harm</a>. Antibodies stop illness
          as warning mechanism of bacterial-infection debris virion in
          synchronicity with cleaning it up, but only “spread,” is mitosis
          thereafter. This is exhibited by the requirement for a cell to make a
          virus, taxonomy endured.
          <br />
          <br />
          All these problems stem from 13d-retail uuid anonymity discrepancy.
          <br />
          Cnn (Dana Bash) will not permit madness prior to criminalization.
          <br />
          We do not know there was not sstemic fraud without content addressable
          anonymous way and public ID matching, with cors.
          <br />
          <a href="https://thumbprint.us/voting">Non voters keep winning</a>
          &nbsp;plural and simple majorities, so default, "no" and jury upon
          their interpretation of countervailing laws at multiples of twelve for
          various industry targeting.
          <br />
          <a href="https://www.fda.gov/media/144245/download#page=42">
            "How sick he was with coronavirus
          </a>
          ,"
          <br />
          Kathy Hochul will provide $2m to 'non-profits,'”
          <br />
          ppp existing biz trust building. if election fraud by pandemic less
          than expected, ppp, bbb (contractors) and ccc (parent) is fraud.
          <br />
          Which dissolves&nbsp;<a href="https://lightte.ch">IP</a>&nbsp;to the
          state.
          <br />
          <h2>
            <span style={{ fontSize: "9px" }}>
              $12k/yr+, $32/day+, $200k total debt per person.
              <br />
              $3k/yr+, $8/day+, $60k total m2 bonds per person.
              <br />
              $64/yr+, $.18/day+, $6k total checking CurrencyComponentOfM1 per
              person.
              <br />
              velocity of m2 minus gdp divided by m2 minus currencyComponentOfM1
              is 1.1yr or $6k/yr/p, gdp/yr/p $66k.
            </span>
            <br />
            You can’t be Trump supporter and conservative.
            <br />
            <span style={{ fontSize: "9px" }}>
              Conservative is about per hour productivity, not market-commune
              corporate profits withheld for a flaccid collective loss
            </span>
          </h2>
          <Cable
            style={{ height: "270px" }}
            onError={handleScollImgError}
            src={
              this.state.nofred
                ? ""
                : `https://drive.google.com/file/d/16Rm-_vAz_Oyni6XIv_iWwbVSNC0kjqWX/preview`
            }
            float="right"
            title="Trump spending ppp trust-building free rider mutable upon fraudulent pandemic for election and gerontocracy existing business over laundering labor-profits for corporate market-communist accounts withheld"
            scrolling={this.state.scrolling}
            fwd={this["scrollImg" + 36]}
            scrollTopAndHeight={this.state.scrollTop + window.innerHeight}
            scrollTop={this.state.scrollTop}
          />
          Can't call gov spending crazy without calling wall st crazy.
          <br />
          1/2 mortgages, half uncollateralized-court-price-fixed-income.
          <br />
          &bull;&nbsp;Amortize reversal of repo-cycle kept down payments by
          cash:debt*income thru&nbsp;
          <a href="https://fred.stlouisfed.org/graph/?g=JzAD">history</a>.
          <br />
          <br />
          <span
            style={{
              backgroundColor: "rgba(160,220,255,.4)"
            }}
          >
            $12k/yr+ debt
          </span>
          &nbsp;(
          <span
            style={{
              backgroundColor: "rgba(20,160,235,.4)"
            }}
          >
            1/2 mortgage-courted-bonds, 1/2 uncollateralized-courted-bonds,
          </span>
          &nbsp;60% free rider mutable tax of $4t/yr fed spend, $2t total cash
          checking currencyComponentOfM1),&nbsp;
          <span
            style={{
              backgroundColor: "rgba(160,220,255,.4)"
            }}
          >
            $66k/yr(+) money and gdp/p, $6k/yr gdp/p without bonds.
          </span>
          <br />
          <br />
          only economically viable to free rider (im)mutable tax in collective
          bargains that are escrow hardly every, meeting the bargain promise of
          materials and labor. otherwise, corporate accounts is a net loss of
          individual labor savings,&nbsp;
          <a href="https://bankingisnot.biz">
            not lend to own{/**competing with consumers */}
          </a>
          , never brought forward demand by compounding third party beneficiary
          donee loitered and claimable, debt-service (10%), debt-spending (40%),
          landlord work deficit HUD gentrification, parental-trust-building,
          existing-business-trust-building, broadband network fees, bridge
          tolls, incarceration net loss scope outlays and receipts by beyond
          article 4 tax only but selling our land out in share-split accrual,
          third party beneficiary donee claimable
          <br />
          <br />
          "Violating journalism ethics and norms," digging up dirt? what? that's
          detective-work against common sense
          <br />
          <Cable
            onError={handleScollImgError}
            src={
              this.state.iosnoPhoto
                ? ""
                : "https://drive.google.com/file/d/1j5ipzHzJbipjaSSgEqt66uHCs0GN030-/preview"
            }
            float="left"
            title="John Bachmann Now (Newsmax) - "
            scrolling={this.state.scrolling}
            fwd={this["scrollImg" + 38]}
            scrollTopAndHeight={this.state.scrollTop + window.innerHeight}
            scrollTop={this.state.scrollTop}
          />
          “Auditing voting data,” is becoming less and less funny,
          <br />
          <Cable
            onError={handleScollImgError}
            src={
              this.state.iosnoPhoto
                ? ""
                : "https://drive.google.com/file/d/16vxarr0hpKgxGNHp5DRysfZCXVmM2HsP/preview"
            }
            float="right"
            title="John Bachmann Now (Newsmax) - "
            scrolling={this.state.scrolling}
            fwd={this["scrollImg" + 37]}
            scrollTopAndHeight={this.state.scrollTop + window.innerHeight}
            scrollTop={this.state.scrollTop}
          />
          “Job reports are beyond bad,” the population is getting older,
          retard-who-likes-busy-work. Productivity is literally the opposite of
          what you say you want, that what is good for you is
          price-deflation-per-hours
          <br />
          <a href="https://micro-theory.com">competition isn't garnered</a>
          &nbsp;from competing with consumers, not paying users is illegal to
          discriminate&nbsp;
          <a href="https://thumbprint.us/speech">before jury-desistation</a>
          <br />
          <h2>
            patriots buy gold,&nbsp;
            <a href="https://teapharmacy.party">are you sure</a>?
          </h2>
          Job numbers alone are not productive, Brian Stelter
          <br />A million kids can die this winter in Afghanistan if without
          relief from monetary by banning finance from intermediate
          supply-demand as labor (expiring-claims, invoices, implausible
          landlord use, repo-cycle kept-down-payments). John Bachmann and the
          right want to bailout debts, the left wants to cancel, the bottom-left
          wants to&nbsp;
          <span
            style={{
              textDecoration: "underline"
            }}
          >
            Amortize reversal of repo-cycle kept down payments by
            cash:debt*income thru history
          </span>
          .
          <br />
          "They are wackadoos,"
          <br />
          Don't go bust Senator D'imato, reverse it, to what we would have paid
          <br />
          <h2>antisocial or socialist?</h2>
          How is socialist smash and grab, reappropriating or nationalization?
          <br />
          (clicked me 9/2020 $88t debt&nbsp;&bull;&nbsp;$2t
          currencyComponentOfM1)
          <br />
          Read a fucking book Kilmeade (false-bid-pool-sponsored
          non-concurrentable non-rollover, expert conflict of interest to forego
          principle loss for monthly "savings" unamortized, delusional and third
          party beneficiary donee claimable).
          <br />
          Progressive regressive, market-communist or criminal, competing with
          intermediate labor and materials consumer theft by third party
          beneficiary donee claimable or running out of money by self-harm
          finance 1/2 mortgages 1/2 court-backed-uncollateralized, expiring
          claims, invoices, implausible landlord use and repo-cycle
          kept-down-payments.
          <div
            style={{
              backgroundColor: "orange",
              color: "black",
              borderRadius: "15px",
              padding: "10px",
              margin: "10px"
            }}
          >
            <Cable
              onError={handleScollImgError}
              src={
                this.state.nofred
                  ? ""
                  : "https://drive.google.com/file/d/1d8k1LPlD88QR-FrCbcIQWNdwYLYnRnjs/preview"
              }
              float="right"
              title="Bill D'Blasio on mandate-madness"
              scrolling={this.state.scrolling}
              fwd={this["scrollImg" + 35]}
              scrollTopAndHeight={this.state.scrollTop + window.innerHeight}
              scrollTop={this.state.scrollTop}
            />
            <h2>
              politics is reason beyond precedence;&nbsp;
              <a href="https://johnshopkins.academia.edu/NickCarducci">
                parties are ideological duress
              </a>
              . Bill Deblasio got 13% of the vote, a default vote, "no," not
              even abstained by holdings
            </h2>
          </div>
          "They put you in the covid ward," with variant-byproduct caught with
          hardly distinct, so much so that&nbsp;
          <a href="https://froth.app/stats">mortality</a>&nbsp;(
          <a href="https://gis.cdc.gov/grasp/fluview/fluportaldashboard.html">
            & hospitalizations
          </a>
          ) is&nbsp;
          <a href="https://www.cdc.gov/flu/weekly/overview.htm#:~:text=5.%20Mortality%20Surveillance">
            PIC
          </a>
          &nbsp;and 5% suspected are&nbsp;
          <a href="https://www.fda.gov/media/144245/download#page=42">covid</a>
          ,&nbsp;
          <a href="https://youtu.be/Weqb9KrQ-TU?t=21">hardly</a>&nbsp;an
          indicator that asymptomatic covid is dangerous for any age.
          <br />
          Merely an indicator of “byproduct-prevalence,” which might otherwise
          be “vivo cause.” "Replicates&nbsp;
          <a href="https://www.frontiersin.org/articles/10.3389/fcimb.2018.00396/full">
            only
          </a>
          &nbsp;with cell," must otherwise mean you think virion is an
          evolutionary-trait to kill other&nbsp;
          <a href="https://www.pfizer.com/news/hot-topics/viral_vs_bacterial_pneumonia_understanding_the_difference">
            humans
          </a>
          ?&nbsp;
          <a href="https://link.springer.com/article/10.1007/s00259-021-05314-2">
            Anyway, here's Wonderwall.
          </a>
          <br />
          <br />
          Republicans & Libertarians: "Vaccines do a good job at stopping
          hospitalizations and deaths, but transmission (prevalence) isn’t
          changed whether vaccinated or not." Exactly, because cartoons are used
          to showcase vivo-insemination of, “injecting dna into cell in an
          instant,” (snapshot). ms matches paralytic polio and
          lifetime-mortality decreased from sewage, not vaccines.
          <br />
          <br />
          “We prevented deaths from something we didn’t even need to prevent
          deaths from,” Charlie Kirk.
          <br />
          <br />
          <h2>
            <a href="https://www.fda.gov/media/144245/download#page=42">
              BioNTech-CEO
            </a>
            &nbsp;of vaccine is legally not allowed to take it.
          </h2>
          Charlie Kirk, "CEO of Pfizer is saying oh the other vaccines are
          killing people." Excess antibodies hot nodal&nbsp;
          <a href="https://link.springer.com/article/10.1007/s00259-021-05314-2">
            leakage
          </a>
          &nbsp;blood disorder oncogenic b-cell dysregulation, watchu think?
          STOP ACTING&nbsp;
          <a href="https://nationalsecuritycasino.com">BEFORE</a>
          &nbsp;JURY-PERMITTING-CONVICTION-AND-DESISTATION, FOR BUSINESS,
          OR&nbsp;
          <a href="https://trucatedsalestax.com">NATIONAL</a>&nbsp;
          <a href="https://3under2.us">SECURITY</a>&nbsp;
          <a href="https://2052.live">ARTICLE 4</a>
          <br />
          <br />
          <Cable
            onError={handleScollImgError}
            src={
              this.state.iosnoPhoto
                ? ""
                : `https://drive.google.com/file/d/1GMFlizML2nTyLQM_JQm-2RCzQ3lmJffX/preview`
            }
            float="left"
            title="The Balance Eric Bolling (Newsmax) - Senator Doctor Roger Mitchell on meaningless of vaccines"
            scrolling={this.state.scrolling}
            fwd={this["scrollImg" + 41]}
            scrollTopAndHeight={this.state.scrollTop + window.innerHeight}
            scrollTop={this.state.scrollTop}
          />
          “Ignorance of the law is not a defense,”
          <br />
          <a href="https://teapharmacy.party">completely</a>&nbsp;dismantle the
          minneapolis police&nbsp;<a href="https://3under2.us">department</a>
          <br />
          <br />
          <Cable
            onError={handleScollImgError}
            src={
              this.state.iosnoPhoto
                ? ""
                : `https://drive.google.com/file/d/1zDwFZpwEIkMPKoUYgsndqvp8pXTw9QQp/preview`
            }
            float="right"
            title="The Balance Eric Bolling (Newsmax) - Senator Doctor Roger Mitchell on meaningless of vaccines"
            scrolling={this.state.scrolling}
            fwd={this["scrollImg" + 40]}
            scrollTopAndHeight={this.state.scrollTop + window.innerHeight}
            scrollTop={this.state.scrollTop}
          />
          “Natural immunity can prevent you from hospitalization and dying,”
          <br />
          “Gun violence is because of gun violence. Gun violence is because of
          the pandemic, yes”
          <br />
          <br />
          <Cable
            onError={handleScollImgError}
            src={
              this.state.iosnoPhoto
                ? ""
                : `https://drive.google.com/file/d/1Y0m1PNnzy8tr4WLyOdvARbzwzOm0GQaE/preview`
            }
            float="left"
            title="The Balance Eric Bolling (Newsmax) - Drew Hernandez"
            scrolling={this.state.scrolling}
            fwd={this["scrollImg" + 39]}
            scrollTopAndHeight={this.state.scrollTop + window.innerHeight}
            scrollTop={this.state.scrollTop}
          />
          “Number one she is a socialist, I believe she is a communist as well.
          She is defund the police, Black Lives Matter, now they are black lives
          race. She sold her soul to communism,” Drew Hernandez
          <br />
          <br />“<a href="https://www.americanfinancing.net/">Big</a>&nbsp;
          <a href="https://carshield.com/">blue</a>
          &nbsp;<a href="https://www.mrc.org/">woke</a>-
          <a href="https://fightwithkash.com/">tards</a>,” PAY ME TO&nbsp;
          <a href="https://twitter.com/nickcarducci">BAN ME</a>.
          <br />
          <a href="https://nationalsecuritycasino.com">Not enough people</a>
          &nbsp;for output (price-deflation-per-hour-thru-time) reasoning, basis
          of free market self-regulation and the&nbsp;
          <a href="https://www.hackensackmeridianhealth.org/en">Wealth</a>
          &nbsp;of&nbsp;
          <a href="https://www.americanbar.org/">Nations</a>
          <br />
          <br />
          free rider mutable "
          <a href="https://truncatedsalestax.com">healthcare coverage</a>,"
          finance cap rent by units or days, not price, invoices, non-rollover
          insurance, repo-cycle kept-down-payments, is retarded
          <br />
          <br />
          <Cable
            onError={handleScollImgError}
            src={
              this.state.iosnoPhoto
                ? ""
                : `https://drive.google.com/file/d/1TfS72S80Ikh27fJOKp4HGl6t8NYTFtCb/preview`
            }
            float="right"
            title="Chris Salcedo (Newsmax) - Three republicans and a meth lab"
            scrolling={this.state.scrolling}
            fwd={this["scrollImg" + 42]}
            scrollTopAndHeight={this.state.scrollTop + window.innerHeight}
            scrollTop={this.state.scrollTop}
          />
          Regulation for drugs but not third party beneficiary donee claimable
          amortization of the reversal of repo-cycle kept-down-payments by
          cash:debt*income thru history
          <br />
          <br />
          If you include the default no votes, whom don’t turnout, diblasio got
          only 13% of the vote.
          <br />
          <br />
          Lets talk about the taxonomy of the virus genus.
          <br />
          Protistologist believe bacteria is cell without nucleus as the uniform
          common ancestor, I guess I’m one of them.
          <br />
          <br />
          What is the derivative taxonomy of cell if protist is bacteria with
          nucleus, golgi and mitochondria, than virus? Virus I think is only
          excrement, as only reproduced vivo with cell and bacteria
          <br />
          <br />
          Have you heard of the virus requiring cell to reproduce, so where was
          the first? evolutionary-trait? Or byproduct, as is a case of
          prevelance, not necessarily transmission.
          <br />
          <br />
          <div
            style={{
              backgroundColor: "orange",
              color: "black",
              borderRadius: "15px",
              padding: "10px",
              margin: "10px"
            }}
          >
            "Well without our legal right to protect consumers," actually,
            <Cable
              style={{ height: "40px" }}
              onError={handleScollImgError}
              src={
                this.state.iosnoPhoto
                  ? ""
                  : `https://drive.google.com/file/d/1iT0Y_8Ol0RTH9cPtBuXeSrxVhy8jpuvh/preview`
              }
              float="right"
              title="Bernie and Sid (77WABC) - 12/13/2021 Mayfield, KY, priced-in demo for expiring claims false bid pools. Third Party Beneficiary Donee Claimable, Surrendered."
              scrolling={this.state.scrolling}
              fwd={this["scrollImg" + 45]}
              scrollTopAndHeight={this.state.scrollTop + window.innerHeight}
              scrollTop={this.state.scrollTop}
            />
            you need permission from a confluence of polls or one&nbsp;
            <a href="https://thumbprint.us/voting">universal</a>&nbsp;
            <a href="https://login.gov">poll</a>, of jury-science (11/12, any
            multiple) for permits beyond mvp duress into minimal viable product.
            <Cable
              style={{ height: "40px" }}
              onError={handleScollImgError}
              src={
                this.state.iosnoPhoto
                  ? ""
                  : "https://drive.google.com/file/d/1XUz-HPvxixVbGa93xKJFRCFPlHzosmYP/preview"
              }
              float="right"
              title="Bernie and Sid (77WABC) - 12/13/2021 bailout, outlay, 1-level-board max-profit-royalty and non market tax inelasticity."
              scrolling={this.state.scrolling}
              fwd={this["scrollImg" + 44]}
              scrollTopAndHeight={this.state.scrollTop + window.innerHeight}
              scrollTop={this.state.scrollTop}
            />
            No business nor article 4 free rider immutable designation can move
            before then, and the onus to start can be precedence, with
            non-state-victimizable torts to come.
          </div>
          <div
            style={{
              backgroundColor: "rgb(180,90,230)",
              color: "white",
              borderRadius: "15px",
              padding: "10px",
              margin: "10px"
            }}
          >
            <Cable
              style={{ height: "90px" }}
              onError={handleScollImgError}
              src={
                this.state.iosnoPhoto
                  ? ""
                  : `https://drive.google.com/file/d/1ES063iJmU8OYUAGZ_GO6uVHLfh6YsIQC/preview`
              }
              float="left"
              title="Bernie and Sid (77WABC) - 12/13/2021 called-'boomers'-for-a-reason mortality-projections, lender-work-deficit and force-majeured-implausible-deniability"
              scrolling={this.state.scrolling}
              fwd={this["scrollImg" + 43]}
              scrollTopAndHeight={this.state.scrollTop + window.innerHeight}
              scrollTop={this.state.scrollTop}
            />
            Brian Kilmeade: “It worked because, 'vaccinations went from 57% to
            71%,' now 34k healthcare workers are now out, they need a job,”
          </div>
          <br />
          Marx really wants communist as per free market communist, occupy wall
          st or anti rent seeker saver.
          <br />
          Would you call Amortize reversal of repo-cycle kept down payments by
          cash:debt*income thru history, socialism? Or just, “smash and grab.”
          <br />
          Nationalist bridge tolls, broadband network fees, & reappropriating
          labor equity?
          <br />
          For a living, dispair, when rent is counted as an asset when analyzing
          cross age but ownership with mortgages, nor
          court-backed-uncollateralized, is counted in inflation nor gini
          <br />
          Why are assets like homes outright, stocks and bonds uncollateralized
          but considered “risk-free” to the right and left, not in inflation nor
          gini? Money is merely non-utilitarian wealth that separates us, why
          would be not analyze wealth, last trade enumerable or not,&nbsp;
          <span
            style={{
              textDecoration: "underline"
            }}
          >
            outlay corporate profits to individual labor savings
          </span>
          &nbsp;and cap rent by units or days, not price?
          <br />
          Net loss bond profits by Republicans and Democrats is
          market-communist, and Libertarians in private
          <br />
          <br />
          “A second chance,” “great, so you’re going to give my customers’ and
          employers’ down payments back?”
          <br />
          <br />
          Give them a ticket, third party beneficiary donee claimable, at
          whatever racketeered price?
          <br />
          &bull;&nbsp;How about we start with cap rent by unit or days not
          price, so hotels and business can stay in business, without business.
          <br />
          &bull;&nbsp;Truncated sales tax to ween our boys in blue off net loss
          profit bondage.
          <br />
          &bull;&nbsp;And max profit royalty all p2p debt from here on out,
          banking staying in concurrentable equity, no more expiring claims that
          don’t rollover premium nor options to buy sold on estimates of
          intermediate labor and materials, or socially-national bridge tolls
          and broadband network fees to the 1/2 mortgages half
          uncollateralized-court-price-fixed-income.
          <br />
          &bull;&nbsp;Amortize reversal of repo-cycle kept down payments by
          cash:debt*income thru history.
          <br />
          <br />
          <span
            style={{
              backgroundColor: "rgba(160,220,255,.4)"
            }}
          >
            $12k/yr+ debt
          </span>
          &nbsp;(
          <span
            style={{
              backgroundColor: "rgba(20,160,235,.4)"
            }}
          >
            1/2 mortgage-courted-bonds, 1/2 uncollateralized-courted-bonds,
          </span>
          &nbsp;60% free rider mutable tax of $4t/yr fed spend, $2t total cash
          checking currencyComponentOfM1),&nbsp;
          <span
            style={{
              backgroundColor: "rgba(160,220,255,.4)"
            }}
          >
            $66k/yr(+) money and gdp/p, $6k/yr gdp/p without bonds.
          </span>
          <br />
          <br />
          Business owner loitering on intermediate materials and labor for no
          greater benefit to input than delusions compounded and laundered, and
          fraudulently collectivized, not even awaiting consumers in a max
          profit royalty deal, why? No productive reason,
          <br />
          <TwitterTweetEmbed
            style={{ float: "right", width: "300px" }}
            key="1416803308824633347"
            tweetId="1416803308824633347" //1391836586707496962//1434568443496370179
          />
          just competing with consumers of the same intermediate labor and
          materials, where demand is labor exclusively and corporate profits are
          outlaid immediately, lest suffer a collective loss on a non-concurrent
          bargain.
          <br />
          “We are going to make them rich because we are getting their rare
          earths for our land, being public park deeds,” John Catsimitidis.
          <br />
          <Cable
            style={{ height: "440px" }}
            onError={handleScollImgError}
            src={
              this.state.iosnoPhoto
                ? ""
                : `https://drive.google.com/file/d/1lESO6sbBnjROcMOoH4cHwWXPfOW-3plD/preview`
            }
            float="left"
            title="Newsmax Congress helps you retire by forcing investment in trust-building by duress for government gentrification and rent-seeking 10% service 40% spending, 60% free rider mutable tax trade"
            scrolling={this.state.scrolling}
            fwd={this["scrollImg" + 34]}
            scrollTopAndHeight={this.state.scrollTop + window.innerHeight}
            scrollTop={this.state.scrollTop}
          />
          <br />
          “Congress created rules to help you retire,”
          <br />
          “These are self-imposed deadlines, so they can ram through them,”
          <br />
          “Deadlines are meant to be broken with infrastructure,”
          <br />
          <br />
          "Illegal immigrants because prohibiting trade," Wise Guys with Joe
          Tobacco and Steve from Manhattan, cornering the market by competing
          with consumers and nationalizing expiring-claims, market-communism:
          socialism is not redistribution but occupy wall st, demand
          exclyusively labor
          <br />
          <br />
          “Once they took guns away, they closed Catholic mass for 50 years,”
          The Truth About Communism, land of free not socialism that
          nationalizes bridge tolls and broadband network fees. Is that right?
          <br />
          <Cable
            style={{ width: "100%", height: "560px" }}
            onError={handleScollImgError}
            src={
              this.state.nofred
                ? ""
                : `https://fred.stlouisfed.org/graph/graph-landing.php?g=H5XB&width=670&height=475`
            }
            float="right"
            title="https://fred.stlouisfed.org/graph/?g=H5XB"
            scrolling={this.state.scrolling}
            fwd={this["scrollImg" + 33]}
            scrollTopAndHeight={this.state.scrollTop + window.innerHeight}
            scrollTop={this.state.scrollTop}
          />
          <br />
          <TwitterTweetEmbed
            style={{ float: "right", width: "300px" }}
            key="1411470492834439171"
            tweetId="1411470492834439171"
          />
          <h2>
            if a&nbsp;
            <a href="https://fred.stlouisfed.org/graph/?g=FSwQ">job</a>
            &nbsp;is rental-income beyond plausible use (market-communist
            blackrock probably is largest plurality of rental-income)
          </h2>
          Should be illegal to compile labor to sign for longer than a month a
          la carte except for sport drafts…
          <br />
          “Money may not be the key to happiness, but it is evidently key to
          mental health,” Dick Morris talking about Gallup poll finding
          self-described non-excellence in mental health from left to right
          <br />
          <br />
          “Stopping payments to China would lower our credit rating, but so
          what?” Dick Morris
          <br />
          <br />
          The left cannot be called progressive, social, liberal nor labor
          either, unless you are discussing the anti-rent-seeker bottom left.
          The top left is market communism for government and welfare, the right
          is market communism for corporate accounts, mortgages and,
          "price-fixed income"
          <br />
          <br />
          {/**rules prohibiting trade */}
          why are there sules to become american? because non-rollover nor
          concurrentable premiums? NYrepublicans.org...
          <br />
          <br />
          boy watched too much Stargate SG-1
          <br />
          <Cable
            onError={handleScollImgError}
            src={
              this.state.iosnoPhoto
                ? ""
                : "https://drive.google.com/file/d/1fb4e1XFnni2YAIspqcScpaIaMt6mh90j/preview"
            }
            float="left"
            title="Save the Nation (Newsmax) - Warren Davidson on the draft and reasoning for war"
            scrolling={this.state.scrolling}
            fwd={this["scrollImg" + 32]}
            scrollTopAndHeight={this.state.scrollTop + window.innerHeight}
            scrollTop={this.state.scrollTop}
          />
          Why would we go to war? Only the organ harvesting is reason to, and
          that can be accomplished with a small team. Bootlickers acting like
          libertarians. I would sooner defend myself from the draft than fight a
          meaningless war{/**I wouldn't give me  */}
          <br />
          <br />
          “Free people fighting for a free country,” how is this amount of debt
          free? If we want to fight we would volunteer, otherwise how can you
          call it virtuous reciprocity and not a war crime? Talk to me when net
          loss profits aren’t made with bonds
          <br />
          <br />
          <a href="https://fred.stlouisfed.org/graph/?g=Jx1E">
            own or rent by age?
          </a>
          &nbsp;they count rent as an asset here, but homes nor bonds are until
          you price-fix them with the courts' repo-cycle kept down payments of
          third party beneficiary donee claimables. we are expected to be serfs,
          for what?
          <h2>
            lender/landlord&nbsp;
            <a href="https://fred.stlouisfed.org/graph/?g=H5XB">work</a>
            &nbsp;deficit
          </h2>
          Have to pay back our debts, the only investment price-fixed by courts,
          but kept down payments upon repo.
          <br />
          <br />
          “Making threats isn’t a way to get out of school,” ok how do you get
          out?
          <br />
          <br />
          "threats to anyone or anyone else, no indications of being-suicidal,
          have not watched UP in the last 24 hrs."
          <br />
          <br />
          "3% of hate speech is caught,” plausible deniability for each
          shaddowbanning-unpaid-users.
          <br />
          <br />
          We have to pay 15 years of jailtime for involuntary manslaughter,
          maybe that time is based on net loss profit bonds, and the prosecution
          is tampered with. At least in white collar malfeasance and closed
          source licensure, for drug war/pharma cop.
          <br />
          "Make our own schools system:" truancy is the gateway drug to Ed tech,
          then insurrection. Need to cut them off at the knees, early.
          <br />
          “Life will be easier when prices are what we can pay for but not
          promise, nor rent or keep down payments upon repo or false bid pools.
          <br />
          <br />
          Expiring claims and invoice prices are matched by those who pay out of
          pocket.
          <br />
          <br />
          We do not have enough people in the world, gdp/p, before 1913, was
          nearly&nbsp;<a href="https://nationalsecuritycasino.com">constant</a>.
          <br />
          <br />
          <Cable
            style={{
              height: "300px"
            }}
            onError={handleScollImgError}
            src={
              this.state.nofred
                ? ""
                : "https://drive.google.com/file/d/1ZlyHIgHSailn751mk3yDUzMSIs8rE2vu/preview"
            }
            float="right"
            title="Pour it On - Savings wealth loss by bonds and courts, price is principle"
            scrolling={this.state.scrolling}
            fwd={this["scrollImg" + 31]}
            scrollTopAndHeight={this.state.scrollTop + window.innerHeight}
            scrollTop={this.state.scrollTop}
          />
          "We told our sons if you get kicked out of this private&nbsp;
          <a href="https://www.biblegateway.com/passage/?search=1%20John%202%3A22&version=KJV">
            catholic
          </a>
          &nbsp;school you go to military school."
          <br />
          <a href="https://fred.stlouisfed.org/graph/?g=JwfE">
            NO ONE IS GOING TO FUCKING PAY FOR IT STEPHEN MOORE STOP LENDER WORK
            DEFICIT.
          </a>
          <br />
          Without education, kids would strive.
          <h2>
            blindsided by numerable loss is not excused for emotional mootness,
            nor retroactive-view of numerations ebodied from emotions, like
            invoices
          </h2>
          "impossible to time," means 13d and retail are treated differently in
          anonymity
          <br />
          non-production delivery and gift or home sales tax is irrelevant to
          article 4 receipt and outlay scope of free rider immutable sewage
          police lawsuits
          <br />
          Educational tax deduction is idea monopsony for IP disolves to the
          state and require a 3 person board. going public instead of making
          your own contracts saves half on income tax
          <br />
          <br />
          shoot em in the leg artery
          <h2>
            Honor system signatures in a fake pandemic, every death was on time.
            Excess deaths age standardized don’t account for cohort size
          </h2>
          <br />
          <div>
            <span
              style={{
                padding: "10px",
                margin: "10px",
                lineHeight: "36px"
              }}
            >
              <span
                style={{
                  backgroundColor: "rgb(0, 174, 243)",
                  color: "white",
                  borderRadius: "15px",
                  padding: "10px"
                }}
              >
                “'Stop or I will shoot you,' that is what happens.”
              </span>
              Castle doctrine is only for benefit of the doubt (user),
              brandishing is allowed but you (police) cannot shoot unless there
              is a life in danger.
            </span>

            <br />
            <div
              style={{
                backgroundColor: "rgb(0, 174, 243)",
                color: "white",
                borderRadius: "15px",
                padding: "10px",
                margin: "10px"
              }}
            >
              “Whether or not they deserve to die or use more lethal force, when
              someone is in the capitol with violent intentions, that is the
              problem.
              <br />
              <br />
              If someone came into my home with violent intentions, they are not
              going to last in that situationwith capitol riots, broken two
              chains of police, those members who were hiding, what would they
              have done, so they put her down. I'm not happy about it.
              <br />
              A normal would have left, is what ashley babbit should have done,
              she should have turned around, and walked away.
              <br />
              She was a terrorist. Trying to kill elected officials. She had bad
              intent.
              <br />
              Many members of congress have ptsd from that day, many are leaving
              congress. ...if someone is in your home you have a right to defend
              your home. ...if someone wants to break into my house, memeber the
              beatles and max and the silver hammer?
              <br />
              <br />
              Tazer first, yeah, but, barricaded behind members of congress, you
              are there to hurt.&nbsp;
              <a href="https://www.biblegateway.com/passage/?search=1%20John%202%3A22&version=KJV">
                Totally justified
              </a>
              &nbsp;in ...
              <br />
              <br />
              The terrorist who are in jail. Tried to overthrow an election”
              there is no way. I’m sorry if you are trying to overthrow the
              government of this country, by force, you go to jail!
              <br />
              <br />
              Ashley Babbit was part of a terrorist group to invade our capital,
              she ignored certain demands to back down. Political violence has
              no place in america.
              <br />
              These people were trying to disrupt the counting of election you
              killa couple members of congress, and if they got through, I
              REALLY THINK they would have.
              <br />
              <br />
              He wasn't riling people up to get them to commit violence, [but to
              grift for money]."
            </div>
          </div>
          <br />
          the pandemic was made to throw the election with honor-system
          signatures and survey bias without shuffling before extrapolating and
          tranche-based-reporting.&nbsp;
          <a href="https://youtu.be/A2kSh0A8Ad0">STAY HOME</a>. you can't audit
          magnetic data, even, douche
          <br />
          <br />A lot of people were there for good reasons, you can’t even
          audit magnetic data, so how are they trying to overthrow the election?
          The pandemic was made to throw the election with honor-system
          signatures and survey bias without shuffling before extrapolating
          tranche-based-reporting. STAY HOME.
          <br />
          Excess deaths age standardized are not fixed for cohort size, 2015-
          75+ gains 1.2m/yr+
          <br />
          <br />
          Certification based on honor system signatures and a magnetic data
          auditing technology, what else are we supposed to do.
          <br />
          Based on the fallacy that this is a pandemic rather than an easily
          projected boomer bump.
          <br />
          Census bureau and I saw this coming.
          <br />
          <br />
          <div
            style={{
              backgroundColor: "rgb(0, 174, 243)",
              color: "white",
              borderRadius: "15px",
              padding: "10px",
              margin: "10px"
            }}
          >
            “You want to defend a person who broke down a door to kill members
            of Congress.”
          </div>
          <div>
            <span
              style={{
                padding: "10px",
                margin: "10px",
                lineHeight: "36px"
              }}
            >
              <span
                style={{
                  backgroundColor: "rgb(0, 174, 243)",
                  color: "white",
                  borderRadius: "15px",
                  padding: "10px"
                }}
              >
                “Look,”
              </span>
              look at what
            </span>
          </div>
          <h2>I have a question and then want to break down gdp for people</h2>
          <Cable
            onError={handleScollImgError}
            src={
              this.state.noyoutube
                ? ""
                : "https://www.youtube.com/embed/4hrMuZEGGmk"
            }
            float="left"
            title="Dick Morris (77WABC) - are we meant to be serfs?"
            scrolling={this.state.scrolling}
            fwd={this["scrollImg" + 30]}
            scrollTopAndHeight={this.state.scrollTop + window.innerHeight}
            scrollTop={this.state.scrollTop}
          />
          <span style={{ textDecoration: "underline" }}>
            How is mortgages not financial fraud if inflation nor gini
            coefficient counts?
          </span>
          &nbsp;How can you say the kids will work it off when 1.1/yr is the
          velocity of checking or m2 without CurrencyComponentOfM1, or GDP.
          <br />
          Third party beneficiary donee claim on what collateral is loitered by
          borrowers and lenders purposefully impossible keep down payments repo
          cycle. Freebies of public park are sufferers are people who worked,
          work and mostly those who contribute in making more competition,
          usually by open-source inventions. Utility cannot be owned, only
          design and discovery can be claimed.
          <br />
          We have a grave lender work deficit, you can’t say population made
          doubling of hours per home every 5 years because before 1913, gdp/p
          was nearly constant except for the repo-cycle than Marx and I want to
          reverse, with cash:debt*income thru income, today’s self described
          socialists aren’t socialist, they are market communist. Why don’t you
          include past work as harmed primarily? That’s why old people can’t
          retire on their own dime, because the private/public debt, still
          laundering third party beneficiary donees’ means of production.
          <br />
          “Require people to work, welfare should be a hand up not a hand out,”
          do you mean price fixing?
          <br />
          We should just cap rent by units or days not price to allow natural
          appropriation my propensities to work and spend, you know,
          microeconomics.
          <br />
          If you want true market liquidity, or true gdp you take velocity of m2
          minus gdp divided by m2 minus CurrencyComponentOfM1 times
          CurrencyComponentOfM1 which is&nbsp;
          <a href="https://fred.stlouisfed.org/graph/?g=C6m9">
            $6k/person/yr and $66k/person/year
          </a>
          &nbsp;with all of m2 bonds. Mostly home prices, although is not gdp,
          inflation nor gini.
          <br />
          {/*
        I have a question and then want to break down gdp for people
        <br />*/}
          Bonds isn’t investment especially if that and homes isn’t counted in
          gini nor&nbsp;
          <a href="https://fred.stlouisfed.org/graph/?g=Jvb8">inflation</a>. We
          can alternate finance, my version of definance, by keeping depositary
          whole on wall st and Washington, keep banks in concurrentable equity
          units, not hours, and p2p for max profit royalty on industry-specific
          incomes so we don’t recreate general income payday loans
          <br />
          Upon withdrawal or sale, I’m actually trying to build my own paytech
          but it seems I’m experiencing industry-sabotage or competing with
          consumers being intermediate demand, in code. We really are best when
          demand is exclusively labor and corporate market communist profits are
          outlaid.
          <br />
          Any escrow not handled immediately or, certainly, expires is
          impossibly a collective bargain, and in fact a net loss, or
          <h2>
            options to buy upon estimates of changing intermediate materials and
            labor.
          </h2>
          <br />
          1/4 gdp is healthcare because insurance Abetts invoices
          <br />
          “Don’t be the last one to join the party,”
          <br />
          How much of a proportion is change of debt, new debt?
          CurrencyComponentOfM1 being 1/11 of m2 shows most of our exchange is
          debt service, exemplified in njta 40% debt service, nj having 50% debt
          spending, 40% fed debt spending and 60% free rider mutable tax, before
          3/2020.
          <br />
          “As markets operate, your risk assets overwhelm hard assets,”
          <br />
          Smiles about the repo-cycle keeping down-payments.
          <br />
          <br />
          Mortages may not be most of&nbsp;
          <a href="https://fred.stlouisfed.org/graph/?g=Jw8h">GDP</a>, but it
          is&nbsp;
          <a href="https://fred.stlouisfed.org/graph/?g=Jvb8">most</a>&nbsp;of
          debt (GDP amortized).
          <br />
          "Communist party big shot attacked her sexually, yet, Stephen, you and
          I are brothers in the supply side free trade movement, I understood
          the pig picture here with chinese tariffs, bond-laundering while we
          are at it," Stephen Moore replies, "yeah, we made them blink!" Aren't
          they still enslaving us thru bonds, AND organ harvesting?
          <br />
          <br />
          "We don't scream nor scold, we stay away from that political fray, we
          are totally educational, we are here for the mom and the baby[, but we
          beat the fuck up on abortionists],"
          <br />
          <h2>
            "free market&nbsp;
            <a href="https://fred.stlouisfed.org/graph/?g=Jveo">prosperity</a>
            &nbsp;starts here"
          </h2>
          <Cable
            style={{
              height: "440px"
            }}
            onError={handleScollImgError}
            src={
              this.state.iosnoPhoto
                ? ""
                : "https://drive.google.com/file/d/12ThssYSlSG9dSGNbCRclb5wsZfKAaf5S/preview"
            }
            float="right"
            title="Larry Kudlow (77WABC) - Bank of America tells Junior executives to dress down for safety"
            scrolling={this.state.scrolling}
            fwd={this["scrollImg" + 30]}
            scrollTopAndHeight={this.state.scrollTop + window.innerHeight}
            scrollTop={this.state.scrollTop}
          />
          “Well healed master of the Universe.” Larry Kudlow
          <br />
          “Equal opportunities, not equal outcomes, equal opportunity of
          outcomes; is Venezuela what we want: no!”
          <br />
          But wall st spends 60/40 to gov
          <br />
          Morgan Stanley
          <br />
          “Jack Dorsey looks like a homeless person,” says Larry Kudlow about
          every young person
          <br />
          Fuck your&nbsp;<a href="https://thumbprint.us/payments">node.js</a>
          &nbsp;bro
          <br />
          I love stocks, I love prosperity, I like bull markets,”
          <br />
          As long as it isn’t public, competing with consumers is fine
          <br />
          Larry: “Socialism is Social spending, no workfare, higher spending,
          green new deal.”
          <h2>
            seems antisocial to me to trust build, (free market), money for same
            free rider immutable tax, bailout, Marx and bona fide labor
          </h2>
          but I'm just a market-strategy and propoganda scholar with a home
          contractors' son' 2008 chip, where malfeasant NJ gov consumer
          protection authority in backing by court options to buy sold on
          estimates like they do bonds but only should when without
          <h2>third party beneficiary donee claimables</h2>
          Why is bond price protected by courts and not stocks? Or if not
          stocks, why is bonds? “Risk-free” according to John Catsimitidis
          <br />
          He puts me on with Frankie Russo who is certified
          <br />
          “The federal reserve doesn’t have the guts to increase interest rates
          or sell,” Morgan Stanley jack bolusion
          <br />
          Compounding is still laundered, even if you don’t involve the national
          depositary
          <br />
          “Then we are in a deep world of hurt,” no you are going to be put to
          sleep you piece of crap.
          <br />
          Like a fucking baby
          <br />
          Cash:debt*income thru history
          <br />
          We could have lowering growth with higher manufacturing
          <br />
          “Not all in all out, but stock pickers. Can’t be against or for debt
          on the whole,” Morgan Stanley jack bolusion
          <br />
          “We have to agree the inflation pressure and headwind will be with us
          for a while,” not necessarily, gdp/p before 1913 was nearly constant,
          but still the repo-cycle kept down payments (not shmita)
          <br />
          “We are no where near profits, profits are the mothers milk of stocks,
          I don’t think profits rally will ever stop. Growth will slow down, but
          level will keep rising. Lower interest rates will increase profits,”
          those are literally&nbsp;
          <a href="https://fred.stlouisfed.org/graph/?g=Jw7O">net loss</a>
          &nbsp;(fix for wealth of bonds and homes, not inflation nor poverty,
          are we predetermined by market-communist competing with consumers wall
          st meant to ever be serfs)? that is a lender work deficitof individual
          labor savings in a perfectly equilibrium market
          <br />
          <br />
          "Not bullish, but calvish, ready for slaughter," Jim Lacamp
          <br />
          <br />
          “Savings by financial aid,” getcoverednj.com.
          <br />
          We need to stop describing American interests anything but protecting
          people in alignment with comparative advantage as technological
          advancement, that would include Government gentrification beyond free
          rider immutable sewage police lawsuits.
          <br />
          Numbers growth without resources is retarded.
          <br />
          People are resources, or at least
          labor-competition-propensity-elasticity.
          <br />
          <h2>
            paying ahead of time with expiring claims isn't only not a bargain
            (net loss), but is illegal
          </h2>
          Car Shield: "We have been in business for years, so we know we aren't
          doing anything illegal," Mark Levin, state sanctioned 'protection'
          racket + invoice duress, "Call for the protection you need. you need
          coverage today. a deductible may apply." That signage is laundering
          false bid of such expiring claim from an actual bid, but for useless
          higher "price," loitering. I call in and say, after the ad, "I want to
          talk about insurance," and he says, "we aren't talking about that
          right now, we are talking about socialism"
          <br />
          <br />
          <Cable
            onError={handleScollImgError}
            src={
              this.state.iosnoPhoto
                ? ""
                : "https://drive.google.com/file/d/12iJ3cLrQEeZG8gBWSfVp4Z5RvyykYER-/preview"
            }
            float="right"
            title="Spicer & co - Claudia Tenney on paying back debts with 44x checking due"
            scrolling={this.state.scrolling}
            fwd={this["scrollImg" + 29]}
            scrollTopAndHeight={this.state.scrollTop + window.innerHeight}
            scrollTop={this.state.scrollTop}
          />
          "Yes, we need to fund the government and meet&nbsp;
          <a href="https://fred.stlouisfed.org/graph/?g=Jve6">
            our obligations
          </a>
          ," or allow private to loiter without allowing bid of third party
          beneficiary donees claimable plaintiffs to be met?
          <br />
          These obligations are usurped
          <br />
          You cannot surrender that which you have no rights to in a&nbsp;
          <a href="https://fred.stlouisfed.org/graph/?g=Jveo">promise</a>
          <br />
          Any free rider mutable tax and 40% debt spending is not
          <br />
          "This is what the voters asked for, they wanted us to work together,"
          <br />
          <br />
          loitering on collateral, laundering from customers and employers,
          repo-cycle kept-down payments comounding intent, let alone waste
          <br />
          <br />
          proper protocols now is consumer protection laws over options to buy
          sold upon estimates of labor and materials, brought forward expiring
          claims home warranty and auto insurance
          <Cable
            onError={handleScollImgError}
            src={
              this.state.iosnoPhoto
                ? ""
                : "https://drive.google.com/file/d/1OfwfIqDkCgLYAvp8HSGcH6MljuvaNbQK/preview"
            }
            float="left"
            title="Spicer & co - discussing spending without discussing spending"
            scrolling={this.state.scrolling}
            fwd={this["scrollImg" + 28]}
            scrollTopAndHeight={this.state.scrollTop + window.innerHeight}
            scrollTop={this.state.scrollTop}
          />
          <h2>conservative, or gimp?</h2>
          jobs are to sellout of your production for someone else, because
          courts are malfeasant in third party beneficiary laws against
          implausible landlord use and other forms of competing with consumers
          <br />
          <br />
          when bond and expiring claims laundering it matters not what you spend
          on, even busy-work hours
          <br />
          <br />
          claims is prohibiting trade and natural price appropriation
          <h2>
            inflation by private only: bonds, market-share & homes aren't
            included in Republican inflation, called, "laundering,"
            "embezzlement," or "fraud"
          </h2>
          "5% s&p gains, and that is tremendous numbers,” Larry Kudlow saying
          profits (withheld individual labor savings withheld) are huge, good
          for stock market [ask, not competition]
          <br />
          <br />
          "People do not want spending nor&nbsp;
          <a href="https://fred.stlouisfed.org/graph/?g=Jvb8">inflation</a>,"
          don't you realize asset prices should be included in inflation for
          market share?
          <br />
          <br />
          <Cable
            onError={handleScollImgError}
            src={
              this.state.iosnoPhoto
                ? ""
                : "https://drive.google.com/file/d/170iv3V5rt0S4ir1Ci-1WhTt9anhojIzi/preview"
            }
            float="right"
            title="Chris Salcado (Newsmax) - Erin Perrine of Trump 2020 campaing"
            scrolling={this.state.scrolling}
            fwd={this["scrollImg" + 27]}
            scrollTopAndHeight={this.state.scrollTop + window.innerHeight}
            scrollTop={this.state.scrollTop}
          />
          If you want to stop looting, remove finance (expiring claims,
          invoices, implausible landlord use, repo-cycle). If you want to solve
          supply chain crisis, immigrate
          <br />
          <br />
          “Anemic job numbers and job participation rate,” means people are
          working for themselves, which is greater competition than nationalized
          corporates and ppp existing business trust building, and tech
          advancement is working
          <br />
          <br />
          <h2>pig</h2>
          <Cable
            onError={handleScollImgError}
            src={
              this.state.iosnoPhoto
                ? ""
                : "https://drive.google.com/file/d/1sju5RqzLrFhOwf7z79_bNkuquF2CKSKx/preview"
            }
            float="left"
            title="Spicer & co - employment lower than expected, that's a good thing, it means we need to work less for the same living"
            scrolling={this.state.scrolling}
            fwd={this["scrollImg" + 26]}
            scrollTopAndHeight={this.state.scrollTop + window.innerHeight}
            scrollTop={this.state.scrollTop}
          />
          You care about inflation? But lender and landlord work deficit is
          greater than actual work,&nbsp;
          <a href="https://fred.stlouisfed.org/graph/?g=Gkvt">10x</a>&nbsp;1970
          5x hours&nbsp;
          <a href="https://fred.stlouisfed.org/graph/?g=H5XB">2x</a>
          &nbsp;workers
          <br />
          <br />
          <h2>can't blame competing with consumers isn't far from piracy</h2>
          “What if CIA underlings don’t want to do something illegal but don’t
          want to lose their pensions,” Lidia-wife-of-mortgager replies, “I
          don’t blame them.” This commentary is off of non-victimizable state in
          oath testimony not illegalities with virtuous torts of individuals
          <br />
          “Can’t have national security without energy security,” nationalized
          energy? You can target-margin consumer surrogate pipe instead
          <br />
          “I don’t want to disclose evidence that isn’t public yet, that isn’t
          ethical,” how and how does it become public? Justice requires public
          review asap.
          <br />
          Torts aren’t claimable on innumerable emotions nor state
          victimization.
          <br />
          Even future income. I can only sue for defamation on unearned
          ticketing income for mental health accusations because others do.
          <br />
          Terrorism requires a threat and if it is legal for malfeasance or
          stated rights, then it isn’t.
          <br />
          “Don’t come into my property or benefit of doubt is mine,”
          <br />
          “Given cops earn on third party beneficiary, I have to take the law
          into my own hands,”
          <br />
          <h2>Go out to sea, Rudy Giuliani</h2>
          “Capital markets,” foreseeable is intent to repo cycle and keep down
          payments, in law we call that, “third party beneficiary donee
          claimable,” does GOP really care about debt? Private/public 60/40. Our
          form of government is not how it is written in article 4 scope nor
          free rider immutable utility not allowing new operations from popping
          up, nor does it increase access for same price, unless the tax comes
          from customers of the same market. Can’t really call bonds capital,
          and I guess not home either if neither are counted in the gini
          inequality coefficient nor inflation, like we are meant to be serfs
          forever without settlement. If 40% debt spending and net loss profit
          from bonds instead of truncated sales tax so cops actually care for
          consumers is your definition of form of government, I don’t want you
          on this land
          <br />
          <br />
          All this is possible due to your generosity because free rider
          immutable
          <br />
          Socialism shares misery? Socialism maintains means of production for
          labor like microeconomics
          <br />
          Market communism is equal share or any other reappropriation,
          including nationalized broadband network fees & bridge tolls
          <br />
          <h2>
            competing with consumers is not productive, nor a business. In fact,
            it is retardation; cash:debt*income thru history
          </h2>
          Insurance is self-harm, non-rollover or try it without invoices. See
          how that works Republicans (and Democrats for work deficit of
          collective loss)
          <br />
          In other words, it's retarded
          <br />
          talk radio is sponsored by insurance
          <br />
          <br />
          _ thinks virion is an evolutionary trait if it, "requires cell to
          reproduce."
          <br />
          All of it is caused by bacteria. Requires cell to reproduce because it
          only comes out and is byproduct
          <br />
          <br />
          <span
            style={{
              textDecoration: "underline"
            }}
          >
            Productivity -10x since 1970 and gini nor inflation counts bonds nor
            homes
          </span>
          <br />
          Republicans hurt for GDP, Democrats hurt for welfare, Libertarians
          hurt for rent-seekers, Savers don't hurt
          <br />
          <h2>
            retarded per hour: utility bills, sweeping social safety net plans,
            instead of banning invoices?
          </h2>
          Emotional distress and ptss is not numerable victimizable tort, nor is
          state or false bid pools, what Marx calls profit and private property,
          where goods are durable and source for materials without outstanding
          <br />
          <br />
          Working for corporate pharma cops or make my own civic tech for such
          malfeasance? What do you fucking think, fucking retard? Self-harm is
          illegal, Frank Diaz
          <br />
          <h2>
            poorness=poverty/equality;&nbsp;
            <a href="https://fred.stlouisfed.org/graph/?g=Ju2y">
              inflation nor gini accounts for home and bond prices
            </a>
          </h2>
          expiring claims in Blue Cross Blue Sheild does not increase access to
          food, literally, "front running" for no concurrentable nor rollover
          bargain. investment bank needs to be in equity awaiting customers
          without invoices, to which insurance would be out of,
          "business,"&nbsp;
          <span style={{ color: "grey" }}>albeit competing with consumers</span>
          <br />
          <br />
          "...productivity continue to increase, than left-right conflict." we
          literally, "
          <a href="https://fred.stlouisfed.org/graph/?g=Gkvt">
            double hours per home every 5 years
          </a>
          . " max profit royalty is permissible as awaits customers and isn't
          general hours and p2p as it isn't concurrentable
          <br />
          <br />
          Employer hours aren’t concurrentable, so only sports can redraft in
          long-term contracts
          <br />
          <br />
          The government can be funded/have lights kept on&nbsp;
          <a href="https://truncatedsalestax.com">without bonds</a>, but how do
          those $4t/yr not become checking currencyComponentOfM1
          <br />
          <br />I invented the new voting system, so based on simple majority of
          expert savefacers, I will be forcing&nbsp;
          <a href="https://pubmed.ncbi.nlm.nih.gov/12049024/">duress</a>&nbsp;on
          my copyrights, lest friends and family discount
          <br />
          <br />
          "a new innovation in time-management technology. Someday. Ingenious.
          <br />
          ...you'll really want this, a way to manage your benefits," a
          collective loss
          <br />
          <br />
          “Cash rules the world,” no, expiring claims and invoices do. Those
          otherwise are durable park goods to equity of IP ever-to-broad, to
          services and hamburgers
          <br />
          <br />
          How do children pay & it causes inflation? Savers or labor equity pay,
          not tax payers nor children you dickless shit
          <br />
          You know nothing about debt
          <br />
          <br />
          <Cable
            style={{ height: "440px" }}
            onError={handleScollImgError}
            src={
              this.state.iosnoPhoto
                ? ""
                : "https://drive.google.com/file/d/1nicLHW-HzLzU1tUVP1V97UmMR_R98azJ/preview"
            }
            float="left"
            title="NJ Star Ledger: 'N.J. reports 3,591 COVID cases, 12 deaths. Hospitalizations top 1,000 for 3rd day.' Out of 192/day deaths, this byproduct prevalence not being the cause is insignificant anyway"
            scrolling={this.state.scrolling}
            fwd={this["scrollImg" + 25]}
            scrollTopAndHeight={this.state.scrollTop + window.innerHeight}
            scrollTop={this.state.scrollTop}
          />
          “Need a&nbsp;
          <a href="https://www.fda.gov/media/144245/download#page=42">test</a>,”
          Fauci
          <br />
          “You can force the donkey to water, but you can’t force the
          municipality to drink.” Curtis Sliwa on broadband network fees and
          bridge tolls
          <h2>
            And 40% debt spending (-consumer surrogate, oil-pipelines
            immediate/asap escrow too, target margin networks & finite producers
            from microeconomic free market equillibrium)
            <br />
            Jury for business reclassifies and classifies duress within mvp
          </h2>
          “Free money, while you have to pay interest for yours!”
          <br />
          <br />
          Then being for such free rider immutable designations of sewage police
          lawsuits
          <br />
          <Cable
            onError={handleScollImgError}
            src={
              this.state.iosnoPhoto
                ? ""
                : "https://drive.google.com/file/d/15KdZlqSUXj1RQfQHx0AMlq4x50WR-dg0/preview"
            }
            float="right"
            title="Wake Up America (Newsmax) - Rob Whitman on government shutdowns, warning us that he already owns all production"
            scrolling={this.state.scrolling}
            fwd={this["scrollImg" + 24]}
            scrollTopAndHeight={this.state.scrollTop + window.innerHeight}
            scrollTop={this.state.scrollTop}
          />
          TSA can be mandated by jury-permitting business duress
          <br />
          <br />
          “You are going to drop your drawers because the government knows,”
          what else am I supposed to do, pop a cap in their heads?
          <br />
          Malfeasant court for duress within mvp
          <br />
          Class resolutions forgone for trial rackets
          <br />
          <br />
          You don’t know shit bitch Elizabeth, nothing to say, that’s why
          everything to you is gibberish
          <br />
          <br />
          I shorted debt with uncollateralized debt without knowing retail
          traders are treated differently than 13d filers and my mom has
          collateralized debt, so my disability from a guard rail near a trail
          laceration is laundered to her
          <br />
          <Cable
            onError={handleScollImgError}
            src={
              this.state.noyoutube
                ? ""
                : "https://www.youtube.com/embed/mlEFtVlivjs"
            }
            float="left"
            title="Dom Carter vaccine mandate permit upon hung-jury, consensus democracy, direct action wavv.art"
            scrolling={this.state.scrolling}
            fwd={this["scrollImg" + 23]}
            scrollTopAndHeight={this.state.scrollTop + window.innerHeight}
            scrollTop={this.state.scrollTop}
          />
          <br />
          Price-deflation per hour is productivity, not gini, inflation, nor
          jobs, prices or natural redistribution (trade per hour).
          <br />
          “Journalists seek the truth, have no bias, go after the facts,” Chris
          Hahn, politics reasons beyond precedence.
          <h2>
            politics is reason beyond precedence when law countervails itself.
          </h2>
          "The virus that killed millions worldwide! That's not science, that's
          political science!" actually, we were supposed to have 50m more deaths
          and 500k more in U.S. than we had in 2020, you think virus is an
          evolutionary trait? It is&nbsp;
          <a href="https://www.pfizer.com/news/hot-topics/viral_vs_bacterial_pneumonia_understanding_the_difference">
            prevalent
          </a>
          -
          <a href="https://wyss.harvard.edu/news/the-secret-life-of-bacteria-revealed/">
            byproduct
          </a>
          &nbsp;of&nbsp;
          <a href="https://youtu.be/Weqb9KrQ-TU?t=21">bacterial</a>-
          <a href="https://www.nature.com/articles/d41586-019-00991-4">
            infection
          </a>
          , not the cause, as would otherwise be an evolutionary trait
          <br />
          <br />
          "Marx is trying to circumvent us! Carsheild will save you money. You
          get healthcare," mark says about brought forward demand of expiring
          claims for collective bargain
          <br />
          <br />
          truncated sales tax per capita basis makes cops care about consumers,
          and jailors care about making them consumers
          <br />
          <br />
          Marx isn't socialism, auditing magrentic data is fraudelent, confirm
          election because cannot ensure uuid isn't fraudulent without
          content-addressible-uuid
          <br />
          <br />
          Isolation from depression anxiety, immobility, decreased going out. or
          maybe 44x cash and now&nbsp;
          <a href="https://www.youtube.com/channel/UCJ5v_MCY6GNUBTO8-D3XoAg">
            trump is bailing himself out with biden
          </a>
          <br />
          <br />
          <Cable
            style={{ width: "100%", height: "400px", maxHeight: "50vw" }}
            onError={handleScollImgError}
            src={
              this.state.nofred
                ? ""
                : "https://drive.google.com/file/d/130fIcjat7_JOzm0MiM5f3O_NNkBkzBeK/preview"
            }
            float="right"
            title="Chris Salcedo (Newsmax) - Rand Paul eye doc on virion incemination of cel with DNA, requiring cell to reproduce-vivo, like an evolutionary trait?"
            scrolling={this.state.scrolling}
            fwd={this["scrollImg" + 22]}
            scrollTopAndHeight={this.state.scrollTop + window.innerHeight}
            scrollTop={this.state.scrollTop}
          />
          Illegal Americans and the lender landlord work deficit driven supply
          chain crisis
          <br />
          Under oath is not alright for state victimizations so it is really
          moot
          <br />
          The 5th amendment is for abuse of prosecution and state victimization
          (fines beyond tort without expiring claims - not an option to buy or
          sell upon settled material and completed labor - capacity laundering
          third party beneficiary)
          <br />
          "People can spread the virus, but I think it is about the people who
          apply legally
          <br />
          <br />
          Government should protect life, violence against others, so I really
          want to protect life,"
          <br />
          <br />
          <Cable
            onError={handleScollImgError}
            src={
              this.state.iosnoPhoto
                ? ""
                : "https://drive.google.com/file/d/1Rpxog1LjIpqTKdd2LG2JbbL4vE0YmABn/preview"
            }
            float="left"
            title="Chris Salcedo (Newsmax) - Greg Murphy MD on mandates. vaccinations, and the preamble of the Constitution"
            scrolling={this.state.scrolling}
            fwd={this["scrollImg" + 21]}
            scrollTopAndHeight={this.state.scrollTop + window.innerHeight}
            scrollTop={this.state.scrollTop}
          />
          “Pursuit of happiness, at anyone else’s cost,”
          <br />
          <br />
          Catholics think Jesus died for sins, Christians think Jesus died
          because of sins
          <br />
          <br />
          Mark Meadows: "Trump cut taxes, grew wages across the board. He
          accomplished all these great&nbsp;
          <a href="https://fred.stlouisfed.org/graph/?g=JsCS">things</a>&nbsp;by
          working with decision-makers"
          <h2>
            Nationalized broadband network fees, bridge-tolls nor
            closed-source-licensure and business-masking/-vaccination is
            socialism nor communism, only market-communism. We want free market
            communism, where gdp/down 11/1 checks is not income. Republicans
            want to hurt for GDP, Dems want to hurt for welfare
          </h2>
          <br />
          <Cable
            onError={handleScollImgError}
            src={
              this.state.iosnoPhoto
                ? ""
                : "https://drive.google.com/file/d/1RWMOYn21Uq2qdvO7N42w8XDBYijf3NDn/preview"
            }
            float="right"
            title="Chris Salcedo (Newsmax) - Lauren Bobart on business vs article 4 vs jury mandates"
            scrolling={this.state.scrolling}
            fwd={this["scrollImg" + 20]}
            scrollTopAndHeight={this.state.scrollTop + window.innerHeight}
            scrollTop={this.state.scrollTop}
          />
          How is duress beyond mvp not market communism, business mandates
          without jury-permits isn’t tranquil nor necessary
          <br />
          <br />
          These two will fund private debt faster than government
          <br />
          <br />
          Politics is reason when law trips over itself
          <br />
          <br />
          I don't want to play as Iblis but,
          <br />
          credit is&nbsp;
          <span
            style={{
              textDecoration: "line-through"
            }}
          >
            theft
          </span>
          &nbsp;haram, livlihood benefit of doubt and malfeasance, plausible
          deniability without evidence available no onus no longer
          <br />
          read a book prick
          <Cable
            onError={handleScollImgError}
            src={
              this.state.iosnoPhoto
                ? ""
                : "https://drive.google.com/file/d/1KtHX3C5kBaGjRPKd7oG4LG64sWxq3KWn/preview"
            }
            float="left"
            title="Chris Salcedo (Newsmax) - slander about socialism, leaving no term for anti-rent-seeking by competing with consumers thru implausible landlord use intent deduced beyond 5 units/30 days, invoices and expiring claims that are third party beneficiary donor claimable by the people with the cash before it is brought forward 60/40 private/public"
            scrolling={this.state.scrolling}
            fwd={this["scrollImg" + 20]}
            scrollTopAndHeight={this.state.scrollTop + window.innerHeight}
            scrollTop={this.state.scrollTop}
          />
          <br />
          Socialism doesn't want to tell you what to do, finance laundering
          third party beneficiary by supply chain without jury-duress-of-mvp nor
          labor as demand.
          <br />
          <br />
          <Cable
            onError={handleScollImgError}
            src={
              this.state.iosnoPhoto
                ? ""
                : "https://drive.google.com/file/d/1X17_YxoiudiLhMicfYxrt_teMLvEsb2k/preview"
            }
            float="right"
            title="American Agenda (Newsmax) - virion cartoon snapshot-prevalence-byproduct is not virion-DNA-vivo-insemination-cause-requiring-cell, is it evolutionary-trait"
            scrolling={this.state.scrolling}
            fwd={this["scrollImg" + 19]}
            scrollTopAndHeight={this.state.scrollTop + window.innerHeight}
            scrollTop={this.state.scrollTop}
          />
          “Donald trump is beyond anything I can accomplish,” Greg Kelly
          <br />
          <br />
          collective escrow is not a bargain if not ASAP material or labor, or
          concurrentable, not hours nor outlays, so&nbsp;
          <a href="https://micro-theory.com">
            keep banks in equity to maintain gain/propensity movements
          </a>
          <h2>
            article 4 scoped receipts and outlays, not r&d, bonds, bridge-tolls
            nor broadband network fees
          </h2>
          <Cable
            onError={handleScollImgError}
            src={
              this.state.iosnoPhoto
                ? ""
                : "https://drive.google.com/file/d/15IVuMpis2xpMX7_iRNk9fHuMfLHpYu2X/preview"
            }
            float="left"
            title="American Agenda (Newsmax) - Pat Fallon"
            scrolling={this.state.scrolling}
            fwd={this["scrollImg" + 19]}
            scrollTopAndHeight={this.state.scrollTop + window.innerHeight}
            scrollTop={this.state.scrollTop}
          />
          My livelihood is due for malfeasant reprimand by civilian by civic
          tech insurrection and trust-building-suits, or else!
          <br />
          <br />
          The bottom left understand that the private sector is 60/40 to gov
          debt and new debt ($12k/year/person $32/day/person before 3/2020,
          mv1===mv2==gdp fraud), absolute net loss, the repo-cycle kept down
          payment intent deduced is a donor third party beneficiary loitered
          upon, as with expiring claims and implausible landlord use as well.
          <br />
          <br />
          <Cable
            style={{ height: "440px" }}
            onError={handleScollImgError}
            src={
              this.state.iosnoPhoto
                ? ""
                : "https://drive.google.com/file/d/1o0vS8UDcjU5_Kh3Pw1IuCZDNNvrWKcVd/preview"
            }
            float="right"
            title="US Ambassador to the U.N. (Charlie Kirk Turning Point) - Marx slander for keeping repo-cycle kept down-payments intent deduced, racketeering-law by expiring-claims and invoices compellingly-abetted"
            scrolling={this.state.scrolling}
            fwd={this["scrollImg" + 18]}
            scrollTopAndHeight={this.state.scrollTop + window.innerHeight}
            scrollTop={this.state.scrollTop}
          />
          <Cable
            onError={handleScollImgError}
            src={
              this.state.iosnoPhoto
                ? ""
                : "https://drive.google.com/file/d/1w319SiKBb8QTqDGLHLzEO3sNmM6OHV92/preview"
            }
            float="left"
            title="John Bachmann Now on American citizenship, philosophical-kings and jury-system"
            scrolling={this.state.scrolling}
            fwd={this["scrollImg" + 17]}
            scrollTopAndHeight={this.state.scrollTop + window.innerHeight}
            scrollTop={this.state.scrollTop}
          />
          “Their individual needs and their individual plan, … that is what
          America is about”
          <br />
          “Lifetime appointments to the United States Supreme Court because they
          aren’t supposed to judge on things that concern them.” Everything
          concerns all of us. This is one supply-chain with comparative
          advantage nouncing technological advancement
          <br />
          <br />
          "Near direct correlation," never can be exogenous enough to be vivo
          without a morsel of retroactive-byproduct-prevalence. When debugging
          or reverse engineering a package, you deduce the solution, you do not
          assume away the solution to fit an equation, as you would in
          epidemiology and econometrics We have a landlord work deficit,
          numerated in:
          <br />
          <br />
          87% 55-64, 99% 65-74, 97% 75+ Vaxxed
          <br />
          73% 50+ pro-AARP, 20x/person 55+/millennial&nbsp;
          <a href="https://30under5.us">rental-income</a>
          <br />
          <h2>
            1/4 pensions, 1/4 pentagon, 1/4 premiums; 10% debt service, 40% debt
            spending, money/expiring claims don't wash dishes/is a bargain
          </h2>
          <Cable
            style={{ height: "300px", transform: "scale(-1,1)" }}
            onError={handleScollImgError}
            src={
              this.state.iosnoPhoto
                ? ""
                : `https://drive.google.com/file/d/1WUeRYDcvGHE2z0w-S2EsPEJ5bvjK7mrI/preview`
            }
            float="right"
            title="PBNews - Jen Psaki at press brief, 'VP Harris Team Fallout'"
            scrolling={this.state.scrolling}
            fwd={this["scrollImg" + 16]}
            scrollTopAndHeight={this.state.scrollTop + window.innerHeight}
            scrollTop={this.state.scrollTop}
          />
          “…imposed unjustifiable human costs, away from high priority efforts…
          matters of homeland security… it’s in the courts currently, so that’s
          where this is.”
          <br />
          <br />
          "...To have a discussion about democracy,... ...we disperse funds to
          those existing organizations who can facilitate a vaccine program,"
          why wouldn't you allow consumers to choose? Even consumer-surrogate by
          operating-costable government gentrification, monopsony and
          rent-seeking, broadband network, bridge-toll and non-concurrentable
          hours, outlays or invoices is a waste in the following ways:
          <br />
          <br />
          <Cable
            style={{ height: "300px", transform: "scale(-1,1)" }}
            onError={handleScollImgError}
            src={
              this.state.iosnoPhoto
                ? ""
                : `https://drive.google.com/file/d/14TN1qtytANrTyh2d4aQSVqX5Zu-_5kFo/preview`
            }
            float="left"
            title="PBNews - Jen Psaki at press brief, 'VP Harris Team Fallout'"
            scrolling={this.state.scrolling}
            fwd={this["scrollImg" + 15]}
            scrollTopAndHeight={this.state.scrollTop + window.innerHeight}
            scrollTop={this.state.scrollTop}
          />
          “We are going to rely on our experts’ guidance.”
          <br />
          <br />
          1. money by free rider mutable tax beyond free rider immutable tax,
          that is of consumer-bid already (not from fatcat/corps), so
          non-inflationary, is useless producer-ask from demandable-bid
          inelasticity
          <br />
          <br />
          2. free rider mutable tax for vaccines is even r&d monopsony and
          existing producer trust-building, let alone expring claim and
          debt-spending
          <br />
          <br />
          <Cable
            style={{ height: "300px" }}
            onError={handleScollImgError}
            src={
              this.state.iosnoPhoto
                ? ""
                : `https://drive.google.com/file/d/1yA2uwHhrFKKP-n4LCU3ROpgwp5oHke4W/preview`
            }
            float="right"
            title="PBNews - Jen Psaki at press brief, 'VP Harris Team Fallout'"
            scrolling={this.state.scrolling}
            fwd={this["scrollImg" + 15]}
            scrollTopAndHeight={this.state.scrollTop + window.innerHeight}
            scrollTop={this.state.scrollTop}
          />
          "free vaccines," are expiring claims? haha, you fat retard
          <br />
          <br />
          “We are making vaccines more readily available,”
          <br />
          <br />
          I invented ArrayArrays content-addressible. You cannot audit
          magnetic-data douche bag
          <br />
          cheer up, concert-goers!
          <a href="https://www.cdc.gov/flu/weekly/overview.htm#:~:text=5.%20Mortality%20Surveillance">
            https://pubmed.ncbi.nlm.nih.gov/12049024/
          </a>
          , if you want to vote
          <br />
          <br />
          ween cops off bonds with&nbsp;
          <a href="https://truncatedsalestax.com">
            truncated sales tax 2025 against menendez
          </a>
          <br />
          <Cable
            onError={handleScollImgError}
            src={
              this.state.iosnoPhoto
                ? ""
                : `https://drive.google.com/file/d/1QNvQ2xtxCtDnLCx7AC2lrnK_pW-zz8ao/preview`
            }
            float="left"
            title="Newsmax - Jen Psaki at press brief, 'VP Harris Team Fallout'"
            scrolling={this.state.scrolling}
            fwd={this["scrollImg" + 14]}
            scrollTopAndHeight={this.state.scrollTop + window.innerHeight}
            scrollTop={this.state.scrollTop}
          />
          "Everyone has right to access to healthcare, even reproductive
          healthcare,
          <br />
          but I'll never say how the Supreme Court will rule."
          <br />
          <br />
          3. "Expanding capacity of rapid-tests," without any demand, brought
          forward bid-demand to ask of same intermediate materials & labor
          monopsony/gentrification is never, "providing access to people at
          home."
          <h2>
            byproduct-prevalence does not make transmissability & hung jury
            science&nbsp;
            <a href="https://humanharvest.info">8/12</a>
          </h2>
          "The President is travelling the country so the american people know
          how he is lowering their costs," but expiring claims is a net loss of
          effective work per hour, making the producer-ask uselessly rich,
          merely of duress beyond minimal viable product by jury-permitting of
          various industry
          <br />
          <br />
          Insurance is only required&nbsp;
          <a href="https://law.justia.com/cases/california/supreme-court/3d/11/394.html">
            because
          </a>
          &nbsp;of invoices and closed-source-licensure, nor is it free rider
          immutable&nbsp;
          <a href="https://3under2.us">sewage police lawsuits</a>
          <br />
          <br />
          “Government funding, standard operating procedure,” is still useless
          net loss intent with money for same intermediate material and labor
          monopsony for free rider mutable operations and bonds 40-50% debt
          spending 10-40% debt service
          <br />
          <br />
          repo-cycle kept-down-payments, cancel, share-split beyond article 4
          receipt and outlay scope, or amortize-reversal? cash:debt*income thru
          income? expiring-claims is "
          <a href="https://saverparty.xyz">savings</a>"
          <h2>
            America first by share split for lender work deficit + equity/public
            parks? Trumpsters off the mark
          </h2>
          <Cable
            style={{
              height: "440px"
            }}
            onError={handleScollImgError}
            src={
              this.state.iosnoPhoto
                ? ""
                : `https://drive.google.com/file/d/1sxNIqf1bRLVV8cJGRj59ZjOwE1XrjmiC/preview`
            }
            float="left"
            title="Bernie and Sid (77WABC) - Republican stay-at-home mom dejecting truncated sales tax instead of 40-50% fed-spening debt-spending"
            scrolling={this.state.scrolling}
            fwd={this["scrollImg" + 13]}
            scrollTopAndHeight={this.state.scrollTop + window.innerHeight}
            scrollTop={this.state.scrollTop}
          />
          <Cable
            style={{
              height: "440px"
            }}
            onError={handleScollImgError}
            src={
              this.state.iosnoPhoto
                ? ""
                : `https://drive.google.com/file/d/1BK3T6pU9JlQtn2JYAL1hmQmZ5DR5Foch/preview`
              //"https://fred.stlouisfed.org/graph/?g=Gkvt"
            }
            float="right"
            title="Bernie and Sid (77WABC) - Republican stay-at-home mom dejecting truncated sales tax instead of 40-50% fed-spening debt-spending"
            scrolling={this.state.scrolling}
            fwd={this["scrollImg" + 12]}
            scrollTopAndHeight={this.state.scrollTop + window.innerHeight}
            scrollTop={this.state.scrollTop}
          />
          Liberty doesn’t allow for liberty to fail, but force majeure does
          <br />
          Taking for other money is not only criminal, but also doesn’t enable
          anything except raise price unless it is also from someone in the same
          situation, jobs for durable goods in public park split accrued is like
          counting childcare for others' doubling employment
          <br />
          We should have a say in who is given the microphone && paid for
          <br />
          <br />
          Equity investment is bankable, yet not backed by courts as is in
          commercial, the debt-cycle
          <br />
          <br />
          You don’t assume the risk by doing that
          <br />
          <br />
          “Feel good about yourself donating”
          <br />
          <br />
          Liberty doesn’t allow for liberty to fail, but force majeure does
          <br />
          When laundering money it matters not what you spend on
          <br />
          <br />
          I have a conspiracy theory because m1v1===m2v2===gdp
          (m1=currencyComponentOfM1) that savings accounts tax money away in
          bond index fund write downs without paying down the principal.
          <br />
          <br />
          don't Obama my Bernie;
          <h2>
            <span
              role="img"
              aria-label="squirrel bottom-left white-circle cancel euro-old-man clown-face"
            >
              🐿↙️⚪️🚫👨🏻‍🦳🤡
            </span>
            &nbsp;Saver Party taking the&nbsp;
            <a href="https://lawdigitalcommons.bc.edu/cgi/viewcontent.cgi?article=1377&context=bclr#page=8">
              term
            </a>
            &nbsp;back (page 477)
          </h2>
          <br />
          Dick Morris (advisor to clinton and trump): "Inflation is because
          of&nbsp;
          <a href="https://billbiden.org">bidens</a>' policies, so people are
          going to gold against high inflation, and inflation will send the
          economy.. down?" by measure of productivity or prices*hours, Richard??
          <br />
          <br />
          <iframe
            style={{
              shapeOutside: "rect()",
              float: "right",
              width: "200px",
              maxWidth: "80%",
              border: 0
            }}
            src="https://www.youtube.com/embed/Jxj0-TaTm4o"
            title="YouTube video player"
          />
          sponsored by Hackensack Medirian called bizarre for the very
          description of the party profiting by false bid pools, net loss
          <br />
          <br />
          don't listen to dr saveface,&nbsp;
          <a href="https://humanharvest.info">listen to statisticians</a>
          <br />
          <br />
          self-inflicted injury advocated by the right and top left only
          off-site because they like the net loss profit of false bid pools
          (non-rollover insurance a.k.a. expiring premiums)
          <br />
          <br />
          40% free-rider-mutable tax monopsony (per past worker), 40%
          debt-spending, 10-40% debt-service
          <br />
          <br />
          business do not know&nbsp;<a href="https://humanharvest.info">best</a>
          , of how to stay safe, only mvp is in jurisdiction of only jury,
          without jury of industry-precedence-interest but not consumer, as
          is&nbsp;
          <a href="https://constitutioncenter.org/interactive-constitution/amendment/amendment-xiv#:~:text=Section%201">
            everyone
          </a>
          <br />
          <br />
          <h2>shut the fuck up judge janine. die</h2>
          mental health scholars are literally making shit up. these are
          criminals of the first degree, else it is an accident
          <br />
          <br />
          <Cable
            onError={handleScollImgError}
            src={
              this.state.iosnoPhoto
                ? ""
                : `https://drive.google.com/file/d/1w1srJSgzu1z3Y5kxtIGb1dSu5XM7-7B-/preview`
            }
            float="left"
            title="John Bachmann Now - Rumble guy"
            scrolling={this.state.scrolling}
            fwd={this["scrollImg" + 18]}
            scrollTopAndHeight={this.state.scrollTop + window.innerHeight}
            scrollTop={this.state.scrollTop}
          />
          “AWS is the underbelly of the internet.”
          <br />
          <br />
          net loss profit per incarcerated? how about Truncated Sales Tax&nbsp;
          <a href="https://truncatedsalestax.com">2025</a>&nbsp; against
          menendez? free rider immutable sewage police lawsuits max $60
          <h1>
            <a href="https://thumbprint.us">Boycotting credit</a>,&nbsp;
            <span style={{ fontSize: "9px" }}>
              write your own contracts, pay tax&nbsp;
              <a href="https://lightte.ch">once</a>!
            </span>
          </h1>
          , I resisted arrest but not actually, they have video evidence but
          take my plea to get out of jail for smoking weed and performing
          enhanced. There is a third option to acquit without evidence or jail,
          without this bail bond racket, third party beneficiary surrendered
          false bid in contract Diagnosed history of mental health issues rather
          than brain dent is not evidence, neither is homelessness caused by
          brain dent but rather 10x hours per home, that is 5x hours per worker
          and 2x worker per person (diminished for capacity) since 1970 because
          of implausible landlord use by unit for days (30), false bid pools and
          accrual as a measure of success, profits withheld from outlays or
          escrow collective bargaining
          <br />
          <br />
          “You have a mental health issue, you go to jail too?” Stop
          assimilating mental acuity with crime Judge Janine. You are
          mentally-incapable of seeing your hypocrisy. Let us scan your brain
          for malformities and correlations with murderers
          <br />
          <br />
          torts should be commensurate with capacity without expiring-,
          non-rollover-insurance in falsly-bargained-collective-bid-pooling, as
          amortization is reimbursement of down payments upon collateral with
          given price-changes reversed by cash:debt*income thru history (then
          truncatedsalestax.com to ween net loss profit per incarceration off
          bonds & fines, care about consumers)
          <h2>
            "social spending," is not reappropriating labor for monopsony,&nbsp;
            <a href="https://constitutioncenter.org/interactive-constitution/article/article-iv">
              slut
            </a>
          </h2>
          If fed spend is $4t/yr, why is there only $2t currencyComponentOfM1?
          There is $170t bond value for all collateral equity, land and
          durable-goods, after all
          <br />
          <br />
          Rent seeking infrastructure/ Net loss 10-40% bond profit + 40-50%
          loitering/ comparative+natural law when precedence and law
          countervails/reason is somewhere between academia+politics and law,
          false bid pool expiring insurance of
          nannies'/mechanics'/closed-source-licensures' hours non-concurrentable
          monthly-"savings"-nonamortized for slighted&nbsp;
          <span style={{ color: "grey" }}>
            (Feign castle doctrine benefit of the doubt for livelihood? Equity
            lest amortize down payments upon repo stands to reason, it might
            happen)
          </span>
          &nbsp;premium, or outright hidden by debt spending than the nuclear
          dilemma that is insurance, public or private. invoices are theft
          should solve it, cash:debt*income thru histoy to reverse or amortize
          not cancel, bailout nor keep down payments upon repo
          (broadband-network-monopoly-finite-producer-non-labor-demand/tolls)
          trust building government monopsony
          <br />
          Get wall st and gov out 60 40
          <br />
          <br />
          False bid pool blank check
          <br />
          Quotas for incarceration and save face precedence or industry
          precedence interest or prejudice by bonds instead of truncated sales
          tax 2025 against Menendez after cash:debt*income thru history instead
          of the repo-cycle, and net loss profit of incarceration and bonds or
          closed-source-licensure and false bid pools
          <br />
          <br />
          "there is going to be a correction if we don't figure a way to turn
          this spending back," Chris Stewart
          <br />
          <br />
          <Cable
            style={{
              height: "560px",
              width: "min-content",
              minWidth: "66%",
              maxWidth: "740px"
            }}
            onError={handleScollImgError}
            src={
              this.state.iosnoPhoto
                ? ""
                : `https://fred.stlouisfed.org/graph/graph-landing.php?g=J6zW&width=670&height=475`
              //"https://fred.stlouisfed.org/graph/?g=Gkvt"
            }
            float="right"
            title=""
            scrolling={this.state.scrolling}
            fwd={this["scrollImg" + 11]}
            scrollTopAndHeight={this.state.scrollTop + window.innerHeight}
            scrollTop={this.state.scrollTop}
          />
          {/*Bacteria and virus make the same symptoms, but severity and acuteness
        correlates positively with bacterial cause, exclusively. Multiple
        sclerosis does match paralytic polio fixed for sewage-lifetime. Testing
        byproduct, asymptomatic to boot not comparable, with insignificant
        hospital capacity from misappropriation of false bid pool premiums of
        expiring insurance non-concurrentable collective bargaining funds on
        administration rather than target-margin, consumer-surrogate equity
        investors or max profit royalty p2p non-concurrentable outlay investors.
        <br />
        Population growth was 1.2m/yr life-expectancy ago.
        <br />
        This science is called epiology, as concerted to see basis-changes as
        time-series econometrics, usually from population size but sometimes
        quantity, but not exclusively per currency.
        <br />
        Price-deflation over hours is output productivity from propensities of
        microeconomic per hour actors.
        <br />
        Speed of light squared leaves energy to equal mass, more specifically,
        electrons pull, and heat/density, electrons leave a compound, how do
        they alone travel in the Sun’s waves? Chicken/egg, no matter
        <br />
        <br />*/}
          wall st/gov 60/40 appends debt for same goods, just monopsony, to the
          tune of&nbsp;
          <a href="https://fred.stlouisfed.org/graph/?g=J4Kr">
            $12k/year/person
          </a>
          <br />
          <h2>
            inflation is caused by price-deflation-over-hours-, working-age-,
            lender-work- and deficit-deficit
          </h2>
          Marx wishes to&nbsp;
          <a href="https://www.marxists.org/archive/marx/works/1848/communist-manifesto/ch02.htm">
            abolish private property
          </a>
          &nbsp;as it pertains to excess margins - & finite producers of
          microeconomic reasoning - thru target-margins, banishment of credit
          cycle & jury-permits.
          <br />
          Neatly, to outlay corporate profits and tort third party beneficiary
          of "brought forward demand" without state nor financier gentrification
          that doesn't contribute actual work, merely price-inflation by tax of
          consumers not in such a given market
          <br />
          <br />
          Socialists do not want to nationalize banking, communists do not want
          to either, only market-communists want expiring insurance and
          fractional reserve, public or private. Libertarians want only private
          to be able to. Saver wants to amortize, not cancel, bailout, keep down
          payments upon reposession, nor have false bid pools
          <br />
          <br />
          Qualified immunity is tortious if it launders free rider mutable tax &
          40-50% debt spending
          <iframe
            style={{
              //shapeOutside: "rect()",
              //float: "right",
              width: "600px",
              maxWidth: "90%",
              border: 0
            }}
            src="https://www.youtube.com/embed/1fZywy8u9ZQ"
            title="YouTube video player"
          />
          <a href="https://fred.stlouisfed.org/graph/?g=H5XB">
            employment (1/tech-advancement)
          </a>
          <br />
          <br />
          Double the amount employed:pop since 1970 = half as much unemployed:
          working age cohort size
          <iframe
            style={{
              //shapeOutside: "rect()",
              //float: "right",
              width: "600px",
              maxWidth: "90%",
              border: 0
            }}
            src="https://www.youtube.com/embed/OqgUxnqc3AM"
            title="YouTube video player"
          />
          <iframe
            style={{
              width: "600px",
              maxWidth: "90%",
              border: 0
            }}
            src="https://www.youtube.com/embed/TjvqmfDvOfQ"
            title="YouTube video player"
          />
          <br />
          <br />
          <a href="https://fred.stlouisfed.org/graph/?g=IHdV">
            output-productivity (x-axis in Supply & Demand, price-deflation per
            hour)
          </a>
          <div style={{ position: "relative", width: "100%" }}>
            <h1>
              Nick Carducci
              <div
                style={{
                  right: "25%",
                  position: "absolute",
                  transform: "translate(0%,-10px)",
                  fontSize: "10px",
                  marginBottom: "5px",
                  color: "grey"
                }}
              >
                .sh
              </div>
              <br />
              <a style={{ fontSize: "15px" }} href="https://micro-theory.com">
                micro-theory
              </a>
              <div
                style={{
                  right: "33%",
                  position: "absolute",
                  transform: "translate(0%,-10px)",
                  fontSize: "10px",
                  marginBottom: "5px",
                  color: "grey"
                }}
              >
                .com
              </div>
            </h1>
          </div>
          <br />
          <h2>problems</h2>
          Bipartisanship is government-gentrification, trust-building,
          rent-seeking, as opposed to targeting margins and hung-jury-permits of
          finite producers, not to be separated from customers nor labor, lest
          be dead-weight-rentier
          <br />
          <br />
          claims aren't for everyone, they just make producers rich by premiums,
          public or private. Invoices and false bid pools are theft
          <br />
          <br />
          <a href="https://fred.stlouisfed.org/graph/?g=Gkvt">
            price-deflation over hours
          </a>
          &nbsp;is productivity
          <br />
          <br />
          <a href="https://fred.stlouisfed.org/graph/?graph_id=946260&rn=393">
            40% debt spending
          </a>
          &nbsp;& free rider mutable tax for rent-seeking, bond-laundering
          (10-40% debt service) & contractor trust-building
          <br />
          <br />
          implausible use rental-income is 20x/person 55+/millennial, with many
          staying at home due to wall st/gov rent-seeking
          <br />
          <br />
          <a href="https://fred.stlouisfed.org/graph/?graph_id=961160&rn=793">
            Home sale price changes Percent of new debt
          </a>
          <br />
          <a href="https://fred.stlouisfed.org/graph/?g=C6m9">
            Debt percent of gdp
          </a>
          <br />
          <a href="https://fred.stlouisfed.org/graph/?g=G8nU">
            Debt share of mortgages and federal debt
          </a>
          <br />
          animal-testing
          <br />
          Prior authorizations is often used with expensive prescription drugs,
          savefacing
          <br />
          <a href="https://thumbprint.us">
            disparate regulations unmet by application of jurious public opinion
          </a>
          <h2>solution</h2>
          2 week anon uuid-broker-tranche executions and
          extermination-discoveries
          <br />
          <br />
          public insurance doesn’t do anything differently than private. We need
          to ban these false bid pools and the invoices they abet on third party
          beneficiary grounds
          <br />
          <br />
          Hidden premiums allow the producer to work less. Better without
          invoices nor insurance (false bid pools), public nor private, as well
          as closed-source-licensure
          <br />
          <br />
          truncated sales tax for free rider immutable sewage police
          lawsuits&nbsp;
          <a href="https://3under2.us">
            max $60 without large-item-sale nor gift-tax
          </a>
          <br />
          <br />
          ban competing with consumers with expiring premiums,
          open-source-licensure, &&nbsp;
          <a href="https://30under5.us">cap rent at 5 units or 30 days</a>, to
          be replaced by collective bargaining for concurrentbale-units only, be
          it equity or escrow-immediately without assumed options to buy with
          changing intermediate-materials-and-labor, and max profit royalty
          (alternative finance) for person-to-person monetary-partnerships
          <TwitterTweetEmbed
            key="1433877605606952965"
            tweetId="1433877605606952965"
          />
          <h2 ref={this.primary}>Are you a New Jersey voter?</h2>
          <h2>Submit your signature! {this.state.signatures}/800</h2>
          {this.state.finished ? (
            <h2>Thank you!</h2>
          ) : (
            <form onSubmit={this.handleSubmit}>
              <input
                onChange={(e) => this.setState({ first: e.target.value })}
                placeholder="first name"
              />
              <input
                onChange={(e) => this.setState({ middle: e.target.value })}
                placeholder="middle name"
              />
              <input
                onChange={(e) => this.setState({ last: e.target.value })}
                placeholder="last name"
              />
              <br />
              <input
                onChange={(e) => this.setState({ address: e.target.value })}
                placeholder="address"
              />
              <input
                onChange={(e) => this.setState({ city: e.target.value })}
                placeholder="city"
              />
              <input
                onChange={(e) => this.setState({ zip: e.target.value })}
                placeholder="zip"
              />
              <div style={{ fontSize: "12px" }}>
                This provisional signature to get on US Sentate ballot in 2025
                will be contestable if <br />
                voter identity is ambiguous{" "}
                <a href="https://voter.svrs.nj.gov/registration-check">
                  https://voter.svrs.nj.gov/registration-check
                </a>
              </div>
              <button type="submit">submit</button>
              {/*<div style={{ color: "grey", fontSize: "10px" }}>
              this is on firebase but only shows you signed if you enter the
              same info...
          </div>*/}
            </form>
          )}
          <h2>"Insurance is only collective bargaining if it rolls-over!"</h2>
          <h2>- Nick Carducci, 2021</h2>
          <h2>
            "Invoices are theft! Debt is third-party-beneficiary usurpments."
          </h2>
          <h2>- Nick Carducci, 2020</h2>
          <h2>
            "Debt can be replaced by timeless-royalty contracts, so we don't
            promise what we do not have for useless price inelasticity!"
          </h2>
          <h2>- Nick Carducci, 2018</h2>
          <iframe
            src="https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2F108986904353225%2Fvideos%2F4404002109665977%2F&show_text=true&width=220&t=0"
            style={{
              width: "200px",
              maxWidth: "100%",
              height: "250px",
              border: 0,
              position: "relative"
            }}
            title="https://fb.watch/8vc_WNxnzq/"
          ></iframe>
          <div>I will support legislation that retains equity</div>
          <div>gained by the work of every individual</div>
          <div>and given by our Creator</div>
          {/*<br/>
        <div>I am writing a book, "Banking is not a Business"</div>*/}
          <br />
          <div>I am a civic tech entrepreneur, financial researcher</div>
          <div>& soon to be author of, "Banking is not a Business"</div>
          <br />
          <div
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              flexDirection: "column"
            }}
          >
            <a
              href="https://saverparty.xyz"
              style={{
                textDecoration: "none",
                position: "relative",
                height: "min-content",
                border: "3px solid black",
                width: "min-content"
              }}
            >
              <img
                style={{ width: "60px", height: "auto" }}
                src="https://www.dl.dropboxusercontent.com/s/oi43wpcc0h9phcz/saverAcorn%20%281%29.png?dl=0"
                alt=""
              />
            </a>
            <a
              href="https://saverparty.xyz"
              style={{
                textDecoration: "none",
                fontSize: "15px",
                marginTop: "4px"
              }}
            >
              saverparty.xyz
            </a>
          </div>
          <br />
          <Doc />
          <iframe
            style={{ width: "90%", border: 0 }}
            src="https://www.youtube.com/embed/A2kSh0A8Ad0"
            title="YouTube video player"
          ></iframe>
          <br />
          <a href="https://thumbprint.us/voting">digital security & change</a>
          <br />
          <br />
          “Big gov socialist like mental health issue, how to justify ramming
          over parade with a vehicle as he said he would do online, what did you
          think he would do? He is actively dangerous,” Newt Gingrich
          <br />
          <br />
          rent
          <TwitterTweetEmbed
            key="1421471623136358405"
            tweetId="1421471623136358405"
          />
          <iframe
            src="https://nextdoor.com/embed/yJhWyXgPTdNG"
            height="302"
            width="100%"
            frameBorder="0"
            title="Nextdoor"
          ></iframe>
          <br />
          <br />
          <Cable
            style={{ height: "440px" }}
            onError={handleScollImgError}
            //img={true}
            src={
              this.state.noyoutube
                ? ""
                : "https://www.youtube.com/embed/ZmUozfOPquk"
            }
            float="left"
            title=""
            scrolling={this.state.scrolling}
            fwd={this["scrollImg" + 49]}
            scrollTopAndHeight={this.state.scrollTop + window.innerHeight}
            scrollTop={this.state.scrollTop}
          />
          Mark Levin, “‘Primary duty of care is government respond to climate
          events.’ People think there are answers to everything, sometimes there
          aren’t."
          <br />
          <br />
          “Why is it always this climate change ideology, is this really the
          time for politics right now?” Mercedes Schlapp
          <br />
          <br />
          <Cable
            onError={handleScollImgError}
            src={
              this.state.noyoutube
                ? ""
                : "https://drive.google.com/file/d/1lwL0XG5NCJA3q8jAkj2uefOtB1iGvUsM/preview"
            }
            float="right"
            title="Spicer & co (Newsmax) - "
            scrolling={this.state.scrolling}
            fwd={this["scrollImg" + 49]}
            scrollTopAndHeight={this.state.scrollTop + window.innerHeight}
            scrollTop={this.state.scrollTop}
          />
          "You can almost pay police double and theydon't want the job anymore,"
          Mercedes Schlapp responds, "Yeah well we know they are demoralized.
          ...There is no question that Biden isn’t accounting for the working
          class of this country.” I don't want to get into George Floyd. We have
          to stop protecting these criminals, they are not assets, they are
          liabilities. 2021 was a&nbsp;
          <a href="https://humanharvest.info/polio">record homicide year</a>."
          Yeah same with record inequality. count rental-income as income
          20x/millennial, half continuing claims and most disability by old
          people. They are criminal third party beneficiary donee claimable
          counterfeit in contract by expiration, estimate or implausible use
          rental-income, for tranquility and voluntary trade, constitutionally.
          <Cable
            onError={handleScollImgError}
            src={
              this.state.noyoutube
                ? ""
                : "https://drive.google.com/file/d/1UwomLnLYAqyVsDetEEpSbEwq3n08y48B/preview"
            }
            float="right"
            title="Spicer & co (Newsmax) - "
            scrolling={this.state.scrolling}
            fwd={this["scrollImg" + 48]}
            scrollTopAndHeight={this.state.scrollTop + window.innerHeight}
            scrollTop={this.state.scrollTop}
          />
          "In vitro [retroactive, as&nbsp;
          <a href="https://youtu.be/Weqb9KrQ-TU?t=21">opposed to vivo</a>]
          infectious but not hospitalization. 98% effective is pretty
          effective." at counting a non exclusive byproduct? You're missing the
          forest for the trees. "You get vaccine it decides how many resrouces
          it wants to spend on antigen, we can go from 5-10 times, hepatitis is
          usually set at 3."
          <br />
          <br />
          <Cable
            style={{
              height: "270px"
            }}
            onError={handleScollImgError}
            src={
              this.state.noyoutube
                ? ""
                : `https://drive.google.com/file/d/1kV8LoEueu3SO5s-ms2AeTtHDEGThIw39/preview`
            }
            float="left"
            title="Spicer & co (Newsmax) - "
            scrolling={this.state.scrolling}
            fwd={this["scrollImg" + 47]}
            scrollTopAndHeight={this.state.scrollTop + window.innerHeight}
            scrollTop={this.state.scrollTop}
          />
          “We know the effect that spending has on inflation (doesn't include
          intermediate-labor, homes nor bonds, like implausible deniability of
          intentional feifdom & servitude perpetually, corporate profits as
          flaccid collective loss, to boot), the more money that is pumped into
          the economy at the federal level, the more inflation.
          <Cable
            style={{ width: "300px" }}
            onError={handleScollImgError}
            src={
              this.state.noyoutube
                ? ""
                : `https://drive.google.com/file/d/1kVL3reVO6IF0SqmLsGLRL26WUi4b_jzj/preview`
            }
            float="right"
            title="Spicer & co (Newsmax) - Ben Weingarten Federalist senior contributor"
            scrolling={this.state.scrolling}
            fwd={this["scrollImg" + 46]}
            scrollTopAndHeight={this.state.scrollTop + window.innerHeight}
            scrollTop={this.state.scrollTop}
          />
          $1.9t, $1.2t, $5t above and beyond normal federal spending $4t/yr 1/4
          1/4 1/4 premium pentagon pensions 10% debt service is only 1/3
          public/private total $12k/year/p new debt, $3k/year/p new m2 bonds,
          and $44k/year/p new money, no matter private debt or not.”
          <br />
          <br />
          “Oils is under every good or service in the economy, but Biden gets
          paid by government contracts so I understand his economic illiteracy,
          Taxes spending deficits upon deficits, obviously causes money
          inflation. Care doesn’t come from nothing. Energy was the strongest
          part of out economy, now we are tapping into out oil reserves.”
          <hr ref={this.videos} />
          socialism, capitalism & democracy
          <br />
          <iframe
            style={{
              shapeOutside: "rect()",
              float: "right",
              width: "200px",
              maxWidth: "80%",
              border: 0
            }}
            src="https://www.youtube.com/embed/nKvUf7F4Xn4"
            title="YouTube video player"
          />
          <br />
          <br />
          <iframe
            style={{
              shapeOutside: "rect()",
              float: "left",
              width: "300px",
              border: 0
            }}
            src="https://www.youtube.com/embed/J4-BdNXesbo"
            title="YouTube video player"
          />
          torts & price - inumerable is inumerable, free friends & family
          discount - involuntary servitude, expiring-insurance surrenders third
          party beneficiary
          <br />
          <br />
          "supply definitely reacts to demand, so inflation shouldn't happen
          from population"
          <br />
          <iframe
            style={{
              shapeOutside: "rect()",
              float: "right",
              width: "300px",
              border: 0
            }}
            src="https://www.youtube.com/embed/NBTw_p-WChI"
            title="YouTube video player"
          />
          truncated sales tax AFTER reverse debt:cash*purchases thru history,
          amortized reimbursement of down-payments and ween jails net loss
          profits thru bonds, free rider mutable rent-seeking by 10%
          bond-laundering (debt-service) and 40% debt-spending, that of which
          is&nbsp;
          <a href="https://fred.stlouisfed.org/graph/?g=G8nU">60/40</a>
          &nbsp;wall st/gov $12k/year/person new debt, a greater influence of
          price-inelasticity of bid-to-ask needlessly, uselessly and
          anticompetitively, futher from infinite producer assumption held by
          labor that is exclusively dupplay and demand would private nor public
          dead-weight-rentier and counterfeiters in contracts rather than per
          unit collective-bargaining and timelesspayday royatly max profit
          contracts for p2p, investment banks stay in equity, inflation vs
          inelasticity
          <br />
          <br />
          <iframe
            style={{
              shapeOutside: "rect()",
              float: "left",
              width: "300px",
              border: 0
            }}
            src="https://www.youtube.com/embed/OqgUxnqc3AM"
            title="YouTube video player"
          />
          10x hours per home, that is 5x hours per worker and 2x worker per
          person, than 1970...
          <br />
          <iframe
            title="YouTube video player"
            style={{
              shapeOutside: "rect()",
              float: "left",
              width: "300px",
              border: 0
            }}
            src="https://www.youtube.com/embed/nUNYL8V0GK4"
          />
        </div>
      </div>
    );
  }
}
export default App;
