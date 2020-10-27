export default {

  login: 'POST /user/session',
  logout: 'DELETE /user/session',
  queryUser: '/user',

  addStaff: 'POST /staff',
  modifyStaff: 'PUT /staff',
  queryStaff: '/staff',

  addTeam: 'POST /team',
  modifyTeam: 'PUT /team',
  queryTeam: '/team',
  queryAllTeam: '/team/all',

  addCompany: 'POST /company',
  modifyCompany: 'PUT /company',
  queryCompany: '/company',

  addCop: 'POST /cop',
  modifyCop: 'PUT /cop',
  queryCop: '/cop',

  addTask: 'POST /task',
  modifyTask: 'PUT /task',
  queryTask: '/task',
  confirmTask: 'PUT /actualtask',

  queryWage: '/wage',
  calcWage: 'POST /wage',
  calcYearAward: '/yearaward',

  addConfig: 'POST /config',
  queryConfig: '/config'
}
