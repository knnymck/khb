import LeadForm from "./components/LeadForm";
import { BRAND_NAME, CONTACT_EMAIL, PHONE_NUMBER } from "./config";

const STEPS = [
  {
    number: "1",
    title: "Tell us about your house",
    body: "Fill out the short form. It takes about 2 minutes, and there's no obligation.",
  },
  {
    number: "2",
    title: "Get your written offer within 24 hours",
    body: "We look at your house and the local market, then send you a straightforward written cash offer within 24 hours. No lowball games, no pressure.",
  },
  {
    number: "3",
    title: "You decide",
    body: "If the number works for you, we close on your timeline. If it doesn't, no hard feelings — you decide if it works.",
  },
];

const SITUATIONS = [
  {
    title: "Facing foreclosure",
    body: "If a sale date is coming up, a fast cash close can stop the clock. We move quickly when time matters.",
  },
  {
    title: "Inherited a house",
    body: "A house you didn't ask for shouldn't become a second job. We buy as-is, so you don't have to clean it out or fix it up.",
  },
  {
    title: "Tired of repairs",
    body: "Roof, foundation, plumbing — whatever it needs, we buy the house as it sits. You don't lift a finger.",
  },
  {
    title: "Problem tenants",
    body: "Done being a landlord? We buy tenant-occupied houses too, and handle the transition after closing.",
  },
  {
    title: "Going through a divorce",
    body: "A clean, fast sale can be one less thing to work through. We keep the process simple and straightforward.",
  },
  {
    title: "Need to move fast",
    body: "Job change, family, or just ready for what's next — we close on your schedule, not ours.",
  },
];

const COMPARISON = [
  {
    label: "Time to close",
    us: "7–14 days, you choose the date",
    traditional: "Often 60+ days",
  },
  {
    label: "Repairs",
    us: "None — we buy as-is",
    traditional: "Often $10k+ before listing",
  },
  {
    label: "Agent commission",
    us: "None",
    traditional: "Typically 5–6% of the sale price",
  },
  {
    label: "Closing costs",
    us: "We pay them",
    traditional: "Seller usually pays 1–3%",
  },
  {
    label: "Financing risk",
    us: "None — cash, no bank involved",
    traditional: "Buyer financing can fall through",
  },
];

const FAQS = [
  {
    question: "How fast can you close?",
    answer:
      "Because we pay cash, there's no bank approval to wait on. Many closings happen in 7–14 days. But the timeline is yours — if you need more time, we work around it.",
  },
  {
    question: "Do I pay any fees or commissions?",
    answer:
      "No. There are no agent commissions, no fees from us, and we pay the closing costs. The offer we make is the amount you walk away with, minus any payoff amounts on the house itself, like your mortgage balance.",
  },
  {
    question: "What condition do you buy in?",
    answer:
      "Any. We buy houses that need a new roof, houses with foundation issues, houses that haven't been updated in decades — and houses that are already in great shape. You never need to make a repair.",
  },
  {
    question: "Can I leave things behind?",
    answer:
      "Yes. Leave behind anything you don't want to take — furniture, junk, even a house full of stuff. We'll deal with it after closing.",
  },
  {
    question: "What if I owe more than the house is worth?",
    answer:
      "Tell us anyway. In some cases we can still help — including talking through options like a short sale with your lender. If we can't make it work, we'll tell you honestly.",
  },
  {
    question: "Is there any obligation?",
    answer:
      "None. Getting an offer costs you nothing and commits you to nothing. If the number doesn't work for you, you walk away — no pressure, and no follow-up calls you didn't ask for.",
  },
  {
    question: "How does the offer work?",
    answer:
      "You tell us about the house, we look at its condition and what similar homes nearby have sold for, and we send you a written cash offer within 24 hours. If you accept, we handle the paperwork and close with a title company, on a date you choose.",
  },
];

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

export default function App() {
  const hasPhone = PHONE_NUMBER.trim() !== "";
  const hasEmail = CONTACT_EMAIL.trim() !== "";
  const year = new Date().getFullYear();

  return (
    <div className="page">
      <header className="site-header">
        <div className="container header-inner">
          <a className="wordmark" href="#top" aria-label="Kirby House Buyers — home">
            Kirby <span>House Buyers</span>
          </a>
          <nav className="site-nav" aria-label="Main">
            <a href="#how-it-works">How it works</a>
            <a href="#why-sell">Why sell to us</a>
            <a href="#faq">FAQ</a>
          </nav>
          <div className="header-actions">
            {hasPhone && (
              <a className="header-phone" href={`tel:${PHONE_NUMBER.replace(/[^+\d]/g, "")}`}>
                {PHONE_NUMBER}
              </a>
            )}
            <a className="button button-primary" href="#offer">
              Get my cash offer
            </a>
          </div>
        </div>
      </header>

      <main id="top">
        <section className="hero">
          <div className="container hero-grid">
            <div className="hero-copy">
              <h1>Sell your house fast — for cash.</h1>
              <p className="hero-sub">
                Kirby House Buyers buys houses across Texas in any condition.
                Tell us about your house and we&rsquo;ll send you a written
                cash offer within 24 hours. No repairs, no showings, no
                fees &mdash; and we pay the closing costs. You decide if it
                works.
              </p>
              <ul className="hero-points">
                <li>
                  <CheckIcon /> Written cash offer within 24 hours
                </li>
                <li>
                  <CheckIcon /> No fees or commissions &mdash; we pay closing
                  costs
                </li>
                <li>
                  <CheckIcon /> Close on your timeline
                </li>
                <li>
                  <CheckIcon /> Any condition, any situation
                </li>
              </ul>
            </div>
            <div className="hero-form" id="offer">
              <LeadForm />
            </div>
          </div>
        </section>

        <section className="steps" id="how-it-works">
          <div className="container">
            <h2>How it works</h2>
            <p className="section-intro">
              Three steps. No listings, no open houses, no waiting on a
              buyer&rsquo;s bank.
            </p>
            <ol className="steps-grid">
              {STEPS.map((step) => (
                <li key={step.number} className="step-card">
                  <span className="step-number" aria-hidden="true">
                    {step.number}
                  </span>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="reasons" id="why-sell">
          <div className="container">
            <h2>Why homeowners sell to us</h2>
            <p className="section-intro">
              Life doesn&rsquo;t always give you time for the traditional way
              of selling. Whatever the situation, we buy the house as it is —
              and we keep it simple.
            </p>
            <div className="reasons-grid">
              {SITUATIONS.map((item) => (
                <article key={item.title} className="reason-card">
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="compare">
          <div className="container">
            <h2>Cash sale vs. traditional listing</h2>
            <p className="section-intro">
              The traditional way can work &mdash; but it&rsquo;s slower,
              costlier, and less certain. Here&rsquo;s the honest comparison.
            </p>
            <div className="compare-table-wrap">
              <table className="compare-table">
                <thead>
                  <tr>
                    <th scope="col">
                      <span className="visually-hidden">Category</span>
                    </th>
                    <th scope="col">Selling to Kirby House Buyers</th>
                    <th scope="col">Traditional listing</th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON.map((row) => (
                    <tr key={row.label}>
                      <th scope="row">{row.label}</th>
                      <td>{row.us}</td>
                      <td>{row.traditional}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="band" aria-label="What you won't deal with">
          <div className="container">
            <p>
              No repairs. No showings. No commissions. No closing costs. No
              waiting on a bank.
            </p>
          </div>
        </section>

        <section className="faq" id="faq">
          <div className="container faq-inner">
            <h2>Questions, answered honestly</h2>
            <div className="faq-list">
              {FAQS.map((faq) => (
                <details key={faq.question} className="faq-item">
                  <summary>{faq.question}</summary>
                  <p>{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="final-cta">
          <div className="container final-cta-inner">
            <h2>Find out what your house is worth to us.</h2>
            <p>
              It takes about 2 minutes, and there&rsquo;s no obligation. You
              decide if it works.
            </p>
            <p>
              When you reach out, you talk to a real person &mdash; not a call
              center. No pressure, no judgment, just an honest cash offer and
              the time to decide what&rsquo;s right for you.
            </p>
            <a className="button button-primary button-large" href="#offer">
              Get my cash offer
            </a>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-inner">
          <div className="footer-brand">
            <span className="wordmark">
              Kirby <span>House Buyers</span>
            </span>
            <p>We buy houses across Texas — any condition, any situation.</p>
            {hasPhone && (
              <p>
                <a href={`tel:${PHONE_NUMBER.replace(/[^+\d]/g, "")}`}>{PHONE_NUMBER}</a>
              </p>
            )}
            {hasEmail && (
              <p>
                <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
              </p>
            )}
          </div>
          <nav className="footer-nav" aria-label="Footer">
            <a href="#how-it-works">How it works</a>
            <a href="#why-sell">Why sell to us</a>
            <a href="#faq">FAQ</a>
            <a href="#offer">Get my cash offer</a>
          </nav>
        </div>
        <div className="container footer-bottom">
          <p>
            © {year} {BRAND_NAME}. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
