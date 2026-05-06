import type { TableColumnRow } from '../table-column/TableColumn';

export type StoryUser = {
  id: number;
  name: string;
  initials: string;
  src: string;
  email: string;
};

export const SAMPLE_USERS: StoryUser[] = [
  { id: 1, name: 'Malik Roberson', initials: 'MR', src: 'https://i.pravatar.cc/48?u=malik', email: 'malik@example.com' },
  { id: 2, name: 'Kenton Jerde', initials: 'KJ', src: 'https://i.pravatar.cc/48?u=kenton', email: 'kenton@example.com' },
  { id: 3, name: 'Talia Kubiak', initials: 'TK', src: 'https://i.pravatar.cc/48?u=talia', email: 'talia@example.com' },
  { id: 4, name: 'Jayson Wintheiser', initials: 'JW', src: 'https://i.pravatar.cc/48?u=jayson', email: 'jayson@example.com' },
  { id: 5, name: 'Shea Trantow', initials: 'ST', src: 'https://i.pravatar.cc/48?u=shea', email: 'shea@example.com' },
  { id: 6, name: 'Casey Miller', initials: 'CM', src: 'https://i.pravatar.cc/48?u=casey', email: 'casey@example.com' },
  { id: 7, name: 'Alex Cooper', initials: 'AC', src: 'https://i.pravatar.cc/48?u=alex', email: 'alex@example.com' },
  { id: 8, name: 'Bria Watsica', initials: 'BW', src: 'https://i.pravatar.cc/48?u=bria', email: 'bria@example.com' },
  { id: 9, name: 'Devon Lubowitz', initials: 'DL', src: 'https://i.pravatar.cc/48?u=devon', email: 'devon@example.com' },
  { id: 10, name: 'Elias Toure', initials: 'ET', src: 'https://i.pravatar.cc/48?u=elias', email: 'elias@example.com' },
  { id: 11, name: 'Fiona Padberg', initials: 'FP', src: 'https://i.pravatar.cc/48?u=fiona', email: 'fiona@example.com' },
  { id: 12, name: 'Gabe Howell', initials: 'GH', src: 'https://i.pravatar.cc/48?u=gabe', email: 'gabe@example.com' },
  { id: 13, name: 'Hana Schmitt', initials: 'HS', src: 'https://i.pravatar.cc/48?u=hana', email: 'hana@example.com' },
  { id: 14, name: 'Iris Cole', initials: 'IC', src: 'https://i.pravatar.cc/48?u=iris', email: 'iris@example.com' },
  { id: 15, name: 'Jamal Weaver', initials: 'JW', src: 'https://i.pravatar.cc/48?u=jamal', email: 'jamal@example.com' },
  { id: 16, name: 'Kiana Gallegos', initials: 'KG', src: 'https://i.pravatar.cc/48?u=kiana', email: 'kiana@example.com' },
  { id: 17, name: 'Liam Bartell', initials: 'LB', src: 'https://i.pravatar.cc/48?u=liam', email: 'liam@example.com' },
  { id: 18, name: 'Maya Ortiz', initials: 'MO', src: 'https://i.pravatar.cc/48?u=maya', email: 'maya@example.com' },
  { id: 19, name: 'Noah Funk', initials: 'NF', src: 'https://i.pravatar.cc/48?u=noah', email: 'noah@example.com' },
  { id: 20, name: 'Olive Reed', initials: 'OR', src: 'https://i.pravatar.cc/48?u=olive', email: 'olive@example.com' },
  { id: 21, name: 'Priya Shah', initials: 'PS', src: 'https://i.pravatar.cc/48?u=priya', email: 'priya@example.com' },
  { id: 22, name: 'Quinn Roberts', initials: 'QR', src: 'https://i.pravatar.cc/48?u=quinn', email: 'quinn@example.com' },
];

export const TEAM_POOL = SAMPLE_USERS;

export const TABLE_COLUMN_ROWS: Record<
  | 'text'
  | 'number'
  | 'date'
  | 'checkbox'
  | 'badge'
  | 'user'
  | 'twoLine'
  | 'twoLineAvatar'
  | 'stacked'
  | 'card'
  | 'actions',
  TableColumnRow[]
> = {
  text: [
    { text: 'Alice' },
    { text: 'Bob' },
    { text: 'Charlie' },
    { text: 'Diana' },
    { text: 'Edward' },
  ],
  number: [
    { text: '1,200' },
    { text: '890' },
    { text: '3,450' },
    { text: '567' },
    { text: '12,000' },
  ],
  date: [
    { text: '12 Jan 2026' },
    { text: '5 Feb 2026' },
    { text: '18 Mar 2026' },
    { text: '3 Apr 2026' },
    { text: '22 May 2026' },
  ],
  checkbox: [
    { checked: true },
    { checked: false },
    { checked: true },
    { checked: false },
    { checked: false },
  ],
  badge: [
    { badgeLabel: 'Active', badgeIntent: 'success' },
    { badgeLabel: 'Pending', badgeIntent: 'warning' },
    { badgeLabel: 'Active', badgeIntent: 'success' },
    { badgeLabel: 'Inactive', badgeIntent: 'danger' },
    { badgeLabel: 'Active', badgeIntent: 'success' },
  ],
  user: SAMPLE_USERS.slice(0, 5).map(({ name, initials, src }) => ({
    text: name,
    initials,
    avatarSrc: src,
  })),
  twoLine: [
    { text: 'Project Alpha', secondaryText: 'Engineering' },
    { text: 'Project Beta', secondaryText: 'Design' },
    { text: 'Project Gamma', secondaryText: 'Marketing' },
    { text: 'Project Delta', secondaryText: 'Sales' },
    { text: 'Project Epsilon', secondaryText: 'Support' },
  ],
  twoLineAvatar: SAMPLE_USERS.slice(0, 5).map(({ name, email, initials, src }) => ({
    text: name,
    secondaryText: email,
    initials,
    avatarSrc: src,
  })),
  stacked: [
    { users: TEAM_POOL.slice(0, 5) },
    { users: TEAM_POOL.slice(0, 22) },
    { users: TEAM_POOL.slice(0, 7) },
    { users: TEAM_POOL.slice(0, 2) },
    { users: TEAM_POOL.slice(0, 14) },
  ],
  card: [
    { cardLast4: '1234' },
    { cardLast4: '5678' },
    { cardLast4: '9012' },
    { cardLast4: '3456' },
    { cardLast4: '7890' },
  ],
  actions: Array.from({ length: 5 }, () => ({})),
};

export const FILTER_USERS = SAMPLE_USERS.slice(0, 7);
export const FILTER_DATE_FIXED_TODAY = new Date(2026, 2, 18);
export const FILTER_STATUS_OPTIONS = ['Active', 'Inactive', 'Pending', 'Archived'];
export const FILTER_NUMERIC_CONDITIONS = ['=', '>', '<', '>=', '<=', 'between'];

export const SIDEBAR_WORKSPACE = {
  name: 'Acme Corp',
  shortName: 'Acme',
  email: 'admin@acme.com',
};

export const SIDEBAR_ACCOUNT_USER = SAMPLE_USERS[0];
