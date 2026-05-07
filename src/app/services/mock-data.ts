import { Contact, EmailAddress } from '../models/contact.model';

/**
 * MOCK DATA — Used by MockContactService to simulate API responses.
 *
 * Assumption: This data mirrors what the real mockapi.io endpoints would return.
 * In production, this file would not exist — data comes from the live API.
 *
 * The avatars use ui-avatars.com as a reliable placeholder image service
 * that generates initials-based avatars. In production, real profile images
 * would be stored in cloud storage (S3/GCS) and served via CDN.
 */

export const MOCK_CONTACTS: Contact[] = [
  {
    id: '1',
    firstName: 'Johanna',
    lastName: 'Stevens',
    role: 'UI/UX Designer',
    department: 'Design',
    phone: '439-582-1578',
    address: '42 Maple Avenue',
    city: 'New York',
    country: 'USA',
    avatar: 'https://i.pravatar.cc/150?img=47',
    status: 'online',
    bio: 'When I first got into advertising, I was looking for the magical combination that would put website into the top search engine rankings.',
    meetingUrl: 'http://go.betacall.com/meet/j.stevens',
    socialLinks: {
      facebook: 'https://facebook.com',
      twitter: 'https://twitter.com',
      linkedin: 'https://linkedin.com',
      instagram: 'https://instagram.com'
    }
  },
  {
    id: '2',
    firstName: 'Nicholas',
    lastName: 'Gordon',
    role: 'Developer',
    department: 'Engineering',
    phone: '512-334-7821',
    address: '18 Tech Park Blvd',
    city: 'Austin',
    country: 'USA',
    avatar: '',
    status: 'offline',
    bio: 'Full-stack developer with 8 years of experience building scalable web applications. Passionate about clean code and developer tooling.',
    meetingUrl: 'http://go.betacall.com/meet/n.gordon',
    socialLinks: {
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com'
    }
  },
  {
    id: '3',
    firstName: 'Bradley',
    lastName: 'Malone',
    role: 'Sales Manager',
    department: 'Sales',
    phone: '621-770-7689',
    address: '9 Commerce Street',
    city: 'Chicago',
    country: 'USA',
    avatar: 'https://i.pravatar.cc/150?img=11',
    status: 'away',
    bio: 'Results-driven sales manager with a track record of exceeding quarterly targets. Specialises in enterprise SaaS contracts.',
    meetingUrl: 'http://go.betacall.com/meet/b.malone',
    socialLinks: {
      linkedin: 'https://linkedin.com',
      facebook: 'https://facebook.com'
    }
  },
  {
    id: '4',
    firstName: 'Marvin',
    lastName: 'Lambert',
    role: 'Designer',
    department: 'Design',
    phone: '718-443-9002',
    address: '5 Creative Lane',
    city: 'Los Angeles',
    country: 'USA',
    avatar: 'https://i.pravatar.cc/150?img=15',
    status: 'busy',
    bio: 'Brand identity and motion graphics designer. Bringing ideas to life through typography, colour, and motion.',
    meetingUrl: 'http://go.betacall.com/meet/m.lambert',
    socialLinks: {
      instagram: 'https://instagram.com',
      twitter: 'https://twitter.com',
      linkedin: 'https://linkedin.com'
    }
  },
  {
    id: '5',
    firstName: 'Teresa',
    lastName: 'Lloyd',
    role: 'PR Agent',
    department: 'Marketing',
    phone: '305-881-2244',
    address: '77 Media Row',
    city: 'Miami',
    country: 'USA',
    avatar: 'https://i.pravatar.cc/150?img=44',
    status: 'online',
    bio: 'Public relations specialist with expertise in crisis communications, brand storytelling, and media outreach.',
    meetingUrl: 'http://go.betacall.com/meet/t.lloyd',
    socialLinks: {
      twitter: 'https://twitter.com',
      linkedin: 'https://linkedin.com',
      facebook: 'https://facebook.com'
    }
  },
  {
    id: '6',
    firstName: 'Fred',
    lastName: 'Haynes',
    role: 'Support Team',
    department: 'Customer Success',
    phone: '404-556-1193',
    address: '23 Help Desk Drive',
    city: 'Atlanta',
    country: 'USA',
    avatar: 'https://i.pravatar.cc/150?img=52',
    status: 'online',
    bio: 'Customer success engineer focused on resolving technical issues quickly and ensuring a smooth user experience.',
    meetingUrl: 'http://go.betacall.com/meet/f.haynes',
    socialLinks: {
      linkedin: 'https://linkedin.com'
    }
  },
  {
    id: '7',
    firstName: 'Rose',
    lastName: 'Peters',
    role: 'Project Manager',
    department: 'Operations',
    phone: '617-229-8834',
    address: '14 Harbour View',
    city: 'Boston',
    country: 'USA',
    avatar: 'https://i.pravatar.cc/150?img=48',
    status: 'away',
    bio: 'Certified PMP with 10+ years managing cross-functional teams. Expert in Agile and Scrum methodologies.',
    meetingUrl: 'http://go.betacall.com/meet/r.peters',
    socialLinks: {
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com'
    }
  },
  {
    id: '8',
    firstName: 'Brian',
    lastName: 'Watson',
    role: 'Developer',
    department: 'Engineering',
    phone: '206-774-5512',
    address: '88 Pike Street',
    city: 'Seattle',
    country: 'USA',
    avatar: '',
    status: 'online',
    bio: 'Backend engineer specialising in microservices, Kubernetes, and cloud-native architectures on AWS and GCP.',
    meetingUrl: 'http://go.betacall.com/meet/b.watson',
    socialLinks: {
      github: 'https://github.com',
      linkedin: 'https://linkedin.com'
    }
  },
  {
    id: '9',
    firstName: 'Hettie',
    lastName: 'Richardson',
    role: 'Developer',
    department: 'Engineering',
    phone: '720-334-6671',
    address: '31 Mountain View Rd',
    city: 'Denver',
    country: 'USA',
    avatar: 'https://i.pravatar.cc/150?img=45',
    status: 'offline',
    bio: 'Frontend developer passionate about accessibility, performance optimisation, and modern CSS techniques.',
    meetingUrl: 'http://go.betacall.com/meet/h.richardson',
    socialLinks: {
      twitter: 'https://twitter.com',
      linkedin: 'https://linkedin.com',
      instagram: 'https://instagram.com'
    }
  },
  {
    id: '10',
    firstName: 'Marcus',
    lastName: 'Chen',
    role: 'Data Analyst',
    department: 'Analytics',
    phone: '415-892-3340',
    address: '60 Silicon Blvd',
    city: 'San Francisco',
    country: 'USA',
    avatar: 'https://i.pravatar.cc/150?img=67',
    status: 'online',
    bio: 'Data analyst with expertise in Python, SQL, and Tableau. Translating complex datasets into actionable business insights.',
    meetingUrl: 'http://go.betacall.com/meet/m.chen',
    socialLinks: {
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com'
    }
  },
  {
    id: '11',
    firstName: 'Sophia',
    lastName: 'Williams',
    role: 'Marketing Lead',
    department: 'Marketing',
    phone: '312-445-8890',
    address: '102 Brand Avenue',
    city: 'Chicago',
    country: 'USA',
    avatar: 'https://i.pravatar.cc/150?img=49',
    status: 'busy',
    bio: 'Growth marketer with a focus on content strategy, SEO, and digital campaign management across B2B and B2C sectors.',
    meetingUrl: 'http://go.betacall.com/meet/s.williams',
    socialLinks: {
      facebook: 'https://facebook.com',
      instagram: 'https://instagram.com',
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com'
    }
  },
  {
    id: '12',
    firstName: 'Daniel',
    lastName: 'Park',
    role: 'DevOps Engineer',
    department: 'Infrastructure',
    phone: '503-667-2213',
    address: '7 Pipeline Way',
    city: 'Portland',
    country: 'USA',
    avatar: 'https://i.pravatar.cc/150?img=68',
    status: 'online',
    bio: 'DevOps engineer building CI/CD pipelines and maintaining cloud infrastructure. Advocate for infrastructure-as-code practices.',
    meetingUrl: 'http://go.betacall.com/meet/d.park',
    socialLinks: {
      github: 'https://github.com',
      linkedin: 'https://linkedin.com'
    }
  }
];

export const MOCK_EMAIL_ADDRESSES: { [contactId: string]: EmailAddress[] } = {
  '1': [
    { id: 'e1', contactId: '1', email: 'johanna.stevens@gmail.com', isPrimary: true, label: 'personal' },
    { id: 'e2', contactId: '1', email: 'johanna.stevens@whiteui.store', isPrimary: false, label: 'work' }
  ],
  '2': [
    { id: 'e3', contactId: '2', email: 'nicholas.gordon@devmail.com', isPrimary: true, label: 'work' },
    { id: 'e4', contactId: '2', email: 'ngordon@gmail.com', isPrimary: false, label: 'personal' }
  ],
  '3': [
    { id: 'e5', contactId: '3', email: 'brad.malone@salesforce.net', isPrimary: true, label: 'work' },
    { id: 'e6', contactId: '3', email: 'bradleymalone@outlook.com', isPrimary: false, label: 'personal' }
  ],
  '4': [
    { id: 'e7', contactId: '4', email: 'marvin.lambert@designstudio.io', isPrimary: true, label: 'work' }
  ],
  '5': [
    { id: 'e8', contactId: '5', email: 'teresa.lloyd@prgroup.com', isPrimary: true, label: 'work' },
    { id: 'e9', contactId: '5', email: 'teresa.lloyd@yahoo.com', isPrimary: false, label: 'personal' }
  ],
  '6': [
    { id: 'e10', contactId: '6', email: 'fred.haynes@support.io', isPrimary: true, label: 'work' }
  ],
  '7': [
    { id: 'e11', contactId: '7', email: 'rose.peters@projecthub.com', isPrimary: true, label: 'work' },
    { id: 'e12', contactId: '7', email: 'rpeters@gmail.com', isPrimary: false, label: 'personal' }
  ],
  '8': [
    { id: 'e13', contactId: '8', email: 'brian.watson@clouddev.io', isPrimary: true, label: 'work' },
    { id: 'e14', contactId: '8', email: 'brianwatson88@gmail.com', isPrimary: false, label: 'personal' }
  ],
  '9': [
    { id: 'e15', contactId: '9', email: 'hettie.richardson@frontend.dev', isPrimary: true, label: 'work' }
  ],
  '10': [
    { id: 'e16', contactId: '10', email: 'marcus.chen@analytics.co', isPrimary: true, label: 'work' },
    { id: 'e17', contactId: '10', email: 'marcuschen@gmail.com', isPrimary: false, label: 'personal' }
  ],
  '11': [
    { id: 'e18', contactId: '11', email: 'sophia.williams@marketingpro.com', isPrimary: true, label: 'work' },
    { id: 'e19', contactId: '11', email: 'sophiawilliams@gmail.com', isPrimary: false, label: 'personal' }
  ],
  '12': [
    { id: 'e20', contactId: '12', email: 'daniel.park@infra.io', isPrimary: true, label: 'work' },
    { id: 'e21', contactId: '12', email: 'dpark.devops@gmail.com', isPrimary: false, label: 'personal' }
  ]
};