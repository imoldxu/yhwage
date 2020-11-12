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

  addDepartment: 'POST /department',
  modifyDepartment: 'PUT /department',
  queryDepartment: '/department',
  queryAllDepartment: '/department/all',
  setDepartmentRatio: 'PATCH /department/ratio', 

  addCop: 'POST /cop',
  modifyCop: 'PUT /cop',
  queryCop: '/cop',

  addCompanyTask: 'POST /companytask',
  modifyCompanyTask: 'PUT /companytask',
  queryCompanyTask: '/companytask',

  queryTeamTasks: '/task/company',
  assignCompanyTask: 'POST /task/company',

  addTask: 'POST /task',
  modifyTask: 'PUT /task',
  queryTask: '/task',
  confirmTask: 'PUT /actualtask',

  queryWage: '/wage',
  calcWage: 'POST /wage',
  deleteWage: 'DELETE /wage',
  calcYearAward: '/yearaward',

  addConfig: 'POST /config',
  queryConfig: '/config',

  staffStatistic: '/statistic/staff',
}
