const { User } = require('../models');

const users = [
  {
    username: 's0dali0n',
    // pzwwR!ndHXV{%&#A,
    password: '$2b$10$8o.CNTnUYdcaGbM15UdnTuf7jPFeqaVVbSuuwr3jW0H1F4jV5A5LW',
  },
  {
    username: 'bladeRunner10',
    // password: 'TnHEImEINp',
    password: '$2b$10$twVhs8PzccbpBjU/VLR1E.sVzOlL39/LkC8wvYEKlv76LoQGeM11a',
  },
  {
    username: 'FarmlandFruit',
    // password: 'FL16ALIQ',
    password: '$2b$10$O9IHF2t3.Pl66k8lCTMAC.63cKgzb.bpjbK8DdB6vGE75vd1ACRfC',
  },
  {
    username: 'notoriousHAM',
    // password: 'mPs;l@b#}',
    password: '$2b$10$jOmKyrqxM4Avkhm1kw09KuOsU0uilYOdb8.kWdHdvVbjzHW7pyRE2',
  },
];

const seedUser = () => User.bulkCreate(users);

module.exports = seedUser;