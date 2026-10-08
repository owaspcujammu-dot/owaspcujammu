/**
 * ---------------------------------------------------------------------------
 * OWASP CUJ - single source of truth for all site content.
 *
 * Everything a chapter officer is likely to change lives here, so the React
 * components stay untouched. Anything wrapped in [SQUARE BRACKETS] is a
 * placeholder that must be replaced before going live.
 * ---------------------------------------------------------------------------
 */

export const siteConfig = {
  name: 'OWASP CUJ',
  longName: 'OWASP Student Chapter - Central University of Jammu',
  university: 'Central University of Jammu',
  // Year the chapter was officially recognised by the OWASP Foundation.
  founded: '2026',
  tagline: "Securing Tomorrow's Applications, Today",
  intro:
    'A student-led security community at Central University of Jammu building real-world offensive and defensive skills - through workshops, CTFs, open-source contribution and hands-on projects.',
  description:
    'The official OWASP Student Chapter at Central University of Jammu. We run application-security workshops, Capture The Flag competitions, bug bounty sessions and hackathons for students across every branch.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://owaspcuj.vercel.app',
  email: 'owaspcujammu@gmail.com',
  address: {
    line1: 'Central University of Jammu, Rahya-Suchani (Bagla)',
    line2: 'District Samba, Jammu & Kashmir - 181143, India',
  },
  /**
   * Wide chapter wordmark (header, hero, footer), as a background-free pair.
   *
   * Background-free PNGs generated from source artwork in /public/brand.
   * `dark` keeps the white line art; `light` turns it navy (#0a1c40) so it
   * stays legible on a white page. Both carry the same blue accent (#4775d1).
   *
   * To swap the artwork, replace both files and update the size below.
   *
   * Set this to `null` to fall back to the built-in shield mark; the hero
   * also falls back on its own if either file goes missing.
   */
  heroLogo: {
    dark: '/brand/chapter-wasp-v2-dark.png',
    light: '/brand/chapter-wasp-v2-light.png',
    width: 823,
    height: 256,
    alt: 'Chapter WASP - OWASP Student Chapter at Central University of Jammu',
  },
  owaspChapterUrl: 'https://owasp.org/chapters/central-university-jammu',
  owaspFoundationUrl: 'https://owasp.org/',
  // [UPDATE] Community invite links - these power every "Join Us" button.
  community: {
    whatsapp: 'https://chat.whatsapp.com/B7jiHm17SLZ3yqdxLBIkn7',
    discord: 'https://discord.gg/kc6suNdqs',
  },
  /**
   * Chapter social profiles. Keys must match components/SocialIcons.jsx;
   * order here is the order the icons render in the footer and contact card.
   * Add `linkedin` and `github` back once those accounts exist - a wrong or
   * dead profile link is worse than no icon.
   */
  socials: {
    facebook: 'https://www.facebook.com/share/p/19gB18YTp3/',
    instagram: 'https://www.instagram.com/owaspcujammu',
    twitter: 'https://x.com/OWASPCUJammu',
  },
};

/**
 * `icon` names map to lucide-react icons in components/Navbar.jsx. The desktop
 * header shows the icon alone (label via tooltip + aria-label); the mobile
 * menu and the footer still use the text label.
 */
export const navLinks = [
  { label: 'Home', href: '#home', icon: 'Home' },
  { label: 'About', href: '#about', icon: 'Info' },
  { label: 'Missions', href: '#activities', icon: 'Target' },
  { label: 'Events', href: '#events', icon: 'CalendarDays' },
  { label: 'Team', href: '#team', icon: 'Users' },
  { label: 'Sponsors', href: '#sponsors', icon: 'Handshake' },
  { label: 'Join Us', href: '#join', icon: 'UserPlus' },
  { label: 'Contact', href: '#contact', icon: 'Mail' },
];

/** Hero rotating words for the typewriter line. */
export const heroKeywords = [
  'AppSec',
  'Capture The Flag',
  'Bug Bounty',
  'Open Source',
  'DevSecOps',
];

/** Section 3 - What we do. `detail` is revealed by the "Show more" toggle. */
export const activities = [
  {
    icon: 'ShieldCheck',
    title: 'Web & App Security Workshops',
    summary:
      'Hands-on labs built around the OWASP Top 10 - injection, broken access control, SSRF and friends - attacked and then patched in the same session.',
    detail:
      'Every workshop runs against a deliberately vulnerable target (Juice Shop, DVWA or a purpose-built lab) inside a sandboxed environment. You break the app with Burp Suite, trace the root cause in the source, then ship the fix and re-test it. No prior security background needed - we start from HTTP fundamentals and build up.',
  },
  {
    icon: 'Flag',
    title: 'Capture The Flag (CTF)',
    summary:
      'Weekly practice rooms plus our own campus-wide CTF, covering web exploitation, cryptography, forensics, reversing and OSINT.',
  },
  {
    icon: 'Bug',
    title: 'Bug Bounty Sessions',
    summary:
      'Responsible-disclosure clinics: recon methodology, report writing, and how to turn a finding into a paid, ethical submission.',
    detail:
      'Sessions cover scope reading, asset discovery, automation with sane rate limits, and the discipline of staying strictly inside authorised targets. We review anonymised real reports line by line - what earned a bounty, what was closed as informative, and why. Program rules and ethics are non-negotiable ground rules here.',
  },
  {
    icon: 'Terminal',
    title: 'Cybersecurity Bootcamps',
    summary:
      'Multi-week intensive tracks that take a complete beginner from Linux and networking basics to a working security toolchain.',
    detail:
      'A structured semester track: Linux and shell, networking and TCP/IP, scripting in Python and Bash, threat modelling, then a specialisation of your choice - AppSec, cloud security, or blue-team detection. Each cohort closes with a graded capstone assessed by seniors and our faculty coordinator.',
  },
  {
    icon: 'Code2',
    title: 'Hackathons & Build Sprints',
    summary:
      'Weekend sprints where teams ship a secure-by-design product - and then get it stress-tested by another team.',
  },
  {
    icon: 'Mic',
    title: 'Guest Tech Talks',
    summary:
      'Practitioners from industry, OWASP chapter leaders and alumni share what security work actually looks like day to day.',
    detail:
      'Fireside sessions with penetration testers, security engineers, SOC analysts and researchers - covering their toolchains, career paths, which certifications are worth the money, and the interview loops they have sat on both sides of. Recordings and slides are archived for members who cannot attend live.',
  },
];

/** Section 4 - Why join. */
export const missionPoints = [
  {
    icon: 'CalendarClock',
    title: 'Regular Meetups',
    body: 'Consistent weekly sessions on campus - never a club that goes quiet after the first month.',
  },
  {
    icon: 'Wrench',
    title: 'Hands-on Skill Development',
    body: 'Labs, live tooling and real targets in a safe sandbox. You learn by doing, not by watching slides.',
  },
  {
    icon: 'Rocket',
    title: 'Real Project Experience',
    body: 'Contribute to open-source security tooling and chapter projects that live on a public GitHub profile.',
  },
  {
    icon: 'Users',
    title: 'Mentorship & Alumni Network',
    body: 'Seniors, alumni and industry mentors who review your work, your resume and your interview prep.',
  },
  {
    icon: 'Palette',
    title: 'Design & Content Opportunities',
    body: 'Not a coder? Drive our design, writing, outreach and event production - every chapter needs it.',
  },
  {
    icon: 'Trophy',
    title: 'Flagship Events',
    body: 'Lead or compete in our annual CTF and hackathon, and represent CUJ at inter-college competitions.',
  },
];

/**
 * Section 5 - Events.
 * `status`: 'upcoming' | 'past'
 * `banner`: optional path under /public/events (e.g. '/events/ctf-2026.jpg').
 *           Leave null to render the marked [ADD EVENT BANNER] placeholder tile.
 */
export const events = [
  {
    title: 'King of the Pirates CTF',
    // null = announced but not scheduled; the card reads 'Date coming soon'
    date: null,
    location: 'Computer Lab Prefab, CUJ',
    status: 'upcoming',
    tag: 'Flagship',
    description:
      'A 4-hour campus-wide jeopardy CTF(Capture the flag) with beginner and open tracks. Web, crypto, forensics, reversing and OSINT categories, with prizes and full solution write-ups afterwards.',
    banner: null,
  },
  {
    title: 'OWASP Top 10 - Hands-on Lab',
    date: null,
    location: 'Online (link shared with members)',
    status: 'upcoming',
    tag: 'Workshop',
    description:
      'Exploit and then remediate each of the OWASP Top 10 categories against a deliberately vulnerable application. Bring a laptop with Burp Suite Community installed.',
    banner: null,
  },
  {
    title: 'Intro to Web Exploitation',
    date: '2026-04-18',
    location: 'Department of Computer Science & IT, CUJ',
    status: 'past',
    tag: 'Workshop',
    description:
      'A packed first workshop on HTTP fundamentals, request interception and finding your first XSS. Over 90 students attended across five branches.',
    banner: null,
  },
  {
    title: 'Linux & Recon Bootcamp',
    date: '2026-03-07',
    location: 'Computer Lab Prefab, CUJ',
    status: 'past',
    tag: 'Bootcamp',
    description:
      'Two days of shell fluency, networking fundamentals and reconnaissance methodology, closing with a guided mini-CTF for every participant.',
    banner: null,
  },
];

/**
 * Section 6 - Team.
 * `photo`: optional path under /public/team (e.g. '/team/president.jpg').
 *          Leave null to render an initials avatar with an [ADD PHOTO] marker.
 */
export const facultyCoordinator = {
  name: 'Dr Jasvinder Pal Singh',
  role: 'Faculty Coordinator',
  department: 'Department of Computer Science & Information Technology',
  photo: '/team/jasvinder-pal-singh.jpg',
  socials: { linkedin: 'https://www.linkedin.com/in/dr-jasvinder-pal-singh-b8028938/', github: null },
};

/*
 * `id` must be unique - it is the React list key. Roles are not, since there
 * are two Co-Leads, and the placeholder names are identical too.
 *
 * `name: null` marks an open position: the card reads "To be selected soon"
 * and hides the social links. To fill a role, set a name and add its socials.
 */
export const coreTeam = [
  {
    id: 'lead',
    name: 'Purushottam K',
    role: 'Lead',
    photo: '/team/purushottam-k.jpg',
    socials: {
      linkedin: 'https://www.linkedin.com/in/purushottam-k-08a414383/',
      github: 'https://github.com/purushottamcuj62045-alt',
    },
  },
  {
    id: 'co-lead-1',
    name: 'Parth Sharma',
    role: 'Co-Lead',
    photo: '/team/parth-sharma.jpg',
    socials: {
      linkedin: 'https://www.linkedin.com/in/parth-sharma-641814386/',
      github: 'https://github.com/Parth-Sharma-25',
    },
  },
  {
    id: 'co-lead-2',
    name: 'Shristi Nayak',
    role: 'Co-Lead',
    photo: '/team/shristi-nayak.jpg',
    socials: {
      linkedin: 'https://www.linkedin.com/in/shristi-nayak-426a21383/',
      github: 'https://github.com/shristinayak18-bit',
    },
  },
  { id: 'technical-lead', name: null, role: 'Technical Lead', photo: null, socials: {} },
   {
    id: 'ctf-lead',
    name: 'Darsh Dhawan',
    role: 'CTF Lead',
    photo: '/team/ctf-lead.jpg',
    socials: {
      linkedin: 'https://www.linkedin.com/in/darshdhawan/',
      github: 'https://github.com/DarshDhawan',
    },
  },
   {
    id: 'operations-lead',
    name: 'FULL NAME HERE',
    role: 'Operations Lead',
    photo: '/team/operations-lead.jpg',
    socials: {
      linkedin: 'https://www.linkedin.com/in/...',
      github: 'https://github.com/...',
    },
  },
  { id: 'content-lead', name: null, role: 'Content Lead', photo: null, socials: {} },
  { id: 'events-lead', name: null, role: 'Events & Outreach Lead', photo: null, socials: {} },
  { id: 'community-manager', name: null, role: 'Community Manager', photo: null, socials: {} },
];

/**
 * Section 7 - Sponsors.
 * Add entries as { name, url, logo } where `logo` is a path under
 * /public/sponsors. An empty tier renders its "become the first" state.
 */
export const sponsorTiers = [
  {
    tier: 'Title Sponsor',
    blurb: 'Headline partner for our flagship CTF and hackathon.',
    sponsors: [],
  },
  {
    tier: 'Associate Sponsors',
    blurb: 'Supporting workshops, bootcamps and student travel to competitions.',
    sponsors: [],
  },
  {
    tier: 'Community Partners',
    blurb: 'Communities and student bodies we build and cross-promote with.',
    sponsors: [],
  },
];
