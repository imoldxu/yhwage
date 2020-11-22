/*
 Navicat Premium Data Transfer

 Source Server         : 127.0.0.1
 Source Server Type    : MySQL
 Source Server Version : 50643
 Source Host           : localhost:3306
 Source Schema         : yh

 Target Server Type    : MySQL
 Target Server Version : 50643
 File Encoding         : 65001

 Date: 15/11/2020 23:41:06
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for t_class_of_position
-- ----------------------------
DROP TABLE IF EXISTS `t_class_of_position`;
CREATE TABLE `t_class_of_position`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '职级名称',
  `basicwage` int(11) UNSIGNED NOT NULL COMMENT '基础工资',
  `floatwage` int(11) UNSIGNED NOT NULL COMMENT '浮动工资',
  `monthratio` double(11, 6) NOT NULL COMMENT '月比例',
  `yearratio` double(11, 6) NOT NULL COMMENT '年比例',
  `ismanager` tinyint(1) NOT NULL COMMENT '是否是管理层',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 10 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of t_class_of_position
-- ----------------------------
INSERT INTO `t_class_of_position` VALUES (1, '总经理', 800000, 400000, 4.000000, 5.000000, 1);
INSERT INTO `t_class_of_position` VALUES (2, '操作副总', 650000, 450000, 3.000000, 4.000000, 1);
INSERT INTO `t_class_of_position` VALUES (3, '销售副总', 550000, 550000, 3.000000, 4.000000, 1);
INSERT INTO `t_class_of_position` VALUES (4, '经理', 400000, 400000, 1.800000, 3.500000, 0);
INSERT INTO `t_class_of_position` VALUES (5, '主管', 350000, 250000, 1.400000, 2.400000, 0);
INSERT INTO `t_class_of_position` VALUES (6, '组长', 300000, 150000, 1.250000, 1.500000, 0);
INSERT INTO `t_class_of_position` VALUES (7, '组员', 250000, 100000, 0.800000, 0.700000, 0);
INSERT INTO `t_class_of_position` VALUES (8, '实习', 250000, 0, 0.200000, 0.200000, 0);
INSERT INTO `t_class_of_position` VALUES (9, '财务', 350000, 100000, 0.400000, 0.800000, 0);

-- ----------------------------
-- Table structure for t_company
-- ----------------------------
DROP TABLE IF EXISTS `t_company`;
CREATE TABLE `t_company`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `scoreweight` int(11) NOT NULL COMMENT '评分权重',
  `profitweight` int(11) NOT NULL COMMENT '利润权重',
  `touristsweight` int(11) NOT NULL COMMENT '游客流量权重',
  `monthratio` double(11, 2) NOT NULL COMMENT '组月提成比例',
  `yearratio` double(11, 2) NOT NULL COMMENT '组年度奖励比例',
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '年度',
  `headerfee` int(11) NOT NULL COMMENT '管理员的月提成比例',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of t_company
-- ----------------------------
INSERT INTO `t_company` VALUES (1, 20, 50, 30, 11.00, 11.00, '誉和旅社', 1000);
INSERT INTO `t_company` VALUES (2, 20, 40, 40, 11.00, 10.00, '风光旅社', 800);
INSERT INTO `t_company` VALUES (3, 10, 60, 30, 14.00, 12.00, '匠印旅社', 500);

-- ----------------------------
-- Table structure for t_company_task
-- ----------------------------
DROP TABLE IF EXISTS `t_company_task`;
CREATE TABLE `t_company_task`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `companyid` int(11) NOT NULL,
  `month` varchar(7) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `profit` int(11) NULL DEFAULT NULL COMMENT '利润',
  `tourists` int(11) UNSIGNED NULL DEFAULT NULL COMMENT '流量',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `index_team_month`(`companyid`, `month`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 9 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of t_company_task
-- ----------------------------
INSERT INTO `t_company_task` VALUES (1, 1, '2020-10', 10000000, 1000);
INSERT INTO `t_company_task` VALUES (2, 2, '2020-10', 15000000, 1200);
INSERT INTO `t_company_task` VALUES (3, 1, '2020-11', 11000000, 1000);
INSERT INTO `t_company_task` VALUES (4, 4, '2020-11', 10000000, 200);
INSERT INTO `t_company_task` VALUES (5, 4, '2020-12', 20000000, 400);
INSERT INTO `t_company_task` VALUES (6, 3, '2020-11', 10000000, 500);
INSERT INTO `t_company_task` VALUES (8, 3, '2020-10', 0, 1000);

-- ----------------------------
-- Table structure for t_config
-- ----------------------------
DROP TABLE IF EXISTS `t_config`;
CREATE TABLE `t_config`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `scoreweight` int(11) NULL DEFAULT NULL COMMENT '评分权重',
  `profitweight` int(11) NULL DEFAULT NULL COMMENT '利润权重',
  `touristsweight` int(11) NULL DEFAULT NULL COMMENT '游客流量权重',
  `teammouthratio` double(11, 2) NULL DEFAULT NULL COMMENT '组月提成比例',
  `teamyearratio` double(11, 2) NULL DEFAULT NULL COMMENT '组年度奖励比例',
  `year` varchar(4) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '年度',
  `managermouthratio` double(11, 2) NULL DEFAULT NULL COMMENT '管理员的月提成比例',
  `manageryearratio` double(11, 2) NULL DEFAULT NULL COMMENT '管理员的年提成比例',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of t_config
-- ----------------------------
INSERT INTO `t_config` VALUES (1, 20, 50, 30, 7.50, 7.50, NULL, 4.50, 4.50);

-- ----------------------------
-- Table structure for t_department
-- ----------------------------
DROP TABLE IF EXISTS `t_department`;
CREATE TABLE `t_department`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '公司名称',
  `companyid` int(11) NULL DEFAULT NULL,
  `ratio` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 10 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of t_department
-- ----------------------------
INSERT INTO `t_department` VALUES (1, '总经办', 1, 30);
INSERT INTO `t_department` VALUES (2, '总经办', 2, 15);
INSERT INTO `t_department` VALUES (3, '外联部', 1, 5);
INSERT INTO `t_department` VALUES (4, '销售部', 1, 34);
INSERT INTO `t_department` VALUES (5, '操作部', 1, 17);
INSERT INTO `t_department` VALUES (6, '资源部', 1, 14);
INSERT INTO `t_department` VALUES (7, '总经办', 3, 30);
INSERT INTO `t_department` VALUES (8, '销售部', 3, 40);
INSERT INTO `t_department` VALUES (9, '操作部', 3, 30);

-- ----------------------------
-- Table structure for t_permission
-- ----------------------------
DROP TABLE IF EXISTS `t_permission`;
CREATE TABLE `t_permission`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `url` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for t_role
-- ----------------------------
DROP TABLE IF EXISTS `t_role`;
CREATE TABLE `t_role`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of t_role
-- ----------------------------
INSERT INTO `t_role` VALUES (1, 'manager');
INSERT INTO `t_role` VALUES (2, 'finance');

-- ----------------------------
-- Table structure for t_role_permission
-- ----------------------------
DROP TABLE IF EXISTS `t_role_permission`;
CREATE TABLE `t_role_permission`  (
  `rid` int(11) NOT NULL,
  `pid` int(11) NOT NULL,
  PRIMARY KEY (`rid`, `pid`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for t_staff
-- ----------------------------
DROP TABLE IF EXISTS `t_staff`;
CREATE TABLE `t_staff`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '姓名',
  `teamid` int(11) NOT NULL COMMENT '所属团队,所有人都有团队',
  `copid` int(11) NOT NULL COMMENT '对应职级',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 13 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of t_staff
-- ----------------------------
INSERT INTO `t_staff` VALUES (1, '徐峰', 5, 5);
INSERT INTO `t_staff` VALUES (2, '刘敏', 1, 1);
INSERT INTO `t_staff` VALUES (3, '李伟', 2, 5);
INSERT INTO `t_staff` VALUES (4, '李伟', 4, 6);
INSERT INTO `t_staff` VALUES (5, '赵敏', 4, 5);
INSERT INTO `t_staff` VALUES (6, '李凯', 6, 4);
INSERT INTO `t_staff` VALUES (7, '雷东', 7, 5);
INSERT INTO `t_staff` VALUES (8, '丁蕾', 13, 1);
INSERT INTO `t_staff` VALUES (9, '菲戈', 11, 5);
INSERT INTO `t_staff` VALUES (10, '曹睿', 12, 6);
INSERT INTO `t_staff` VALUES (11, '白鹏', 15, 6);
INSERT INTO `t_staff` VALUES (12, '赵信', 14, 7);

-- ----------------------------
-- Table structure for t_task
-- ----------------------------
DROP TABLE IF EXISTS `t_task`;
CREATE TABLE `t_task`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `teamid` int(11) NOT NULL,
  `month` varchar(7) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `profit` int(11) NULL DEFAULT NULL COMMENT '利润',
  `tourists` int(11) UNSIGNED NULL DEFAULT NULL COMMENT '流量',
  `actualprofit` int(11) NULL DEFAULT NULL COMMENT '实际利润',
  `actualtourists` int(11) UNSIGNED NULL DEFAULT NULL COMMENT '实际流量',
  `actualscore` double(11, 2) NULL DEFAULT NULL COMMENT '实际评分',
  `othercost` int(11) UNSIGNED NULL DEFAULT NULL COMMENT '其他成本',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `index_team_month`(`teamid`, `month`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 59 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of t_task
-- ----------------------------
INSERT INTO `t_task` VALUES (1, 1, '2020-10', 10000000, 1000, 8000000, 720, 5.00, 50000);
INSERT INTO `t_task` VALUES (2, 2, '2020-10', 15000000, 1200, 10000000, 980, 4.00, 40000);
INSERT INTO `t_task` VALUES (3, 1, '2020-11', 11000000, 1000, 10000000, 800, 4.00, 1000000);
INSERT INTO `t_task` VALUES (4, 4, '2020-11', 3000000, 200, 3000000, 300, 5.00, 500000);
INSERT INTO `t_task` VALUES (5, 4, '2020-12', 20000000, 400, NULL, NULL, NULL, NULL);
INSERT INTO `t_task` VALUES (42, 2, '2020-11', 11000000, 1000, 10000000, 800, 4.00, 1000000);
INSERT INTO `t_task` VALUES (43, 6, '2020-11', 2000000, 200, 5000000, 400, 5.00, 1000000);
INSERT INTO `t_task` VALUES (44, 7, '2020-11', 4000000, 400, 3000000, 200, 4.00, 0);
INSERT INTO `t_task` VALUES (45, 8, '2020-11', 5000000, 400, 2000000, 200, 5.00, 0);
INSERT INTO `t_task` VALUES (46, 9, '2020-11', 4000000, 400, 2000000, 400, 5.00, 500000);
INSERT INTO `t_task` VALUES (47, 10, '2020-11', 4000000, 400, 5000000, 100, 4.00, 0);
INSERT INTO `t_task` VALUES (48, 5, '2020-11', 11000000, 1000, 10000000, 800, 4.00, 1000000);
INSERT INTO `t_task` VALUES (49, 13, '2020-11', 10000000, 500, NULL, NULL, NULL, NULL);
INSERT INTO `t_task` VALUES (50, 11, '2020-11', 5000000, 250, NULL, NULL, NULL, NULL);
INSERT INTO `t_task` VALUES (51, 15, '2020-11', 5000000, 250, NULL, NULL, NULL, NULL);
INSERT INTO `t_task` VALUES (52, 12, '2020-11', 5000000, 250, NULL, NULL, NULL, NULL);
INSERT INTO `t_task` VALUES (53, 14, '2020-11', 5000000, 250, NULL, NULL, NULL, NULL);
INSERT INTO `t_task` VALUES (54, 13, '2020-10', 0, 1000, -500000, 800, 4.00, 100000);
INSERT INTO `t_task` VALUES (55, 11, '2020-10', 0, 600, -600000, 600, 4.00, 100000);
INSERT INTO `t_task` VALUES (56, 15, '2020-10', 0, 400, 100000, 200, 5.00, 0);
INSERT INTO `t_task` VALUES (57, 12, '2020-10', 0, 600, -300000, 450, 4.00, 60000);
INSERT INTO `t_task` VALUES (58, 14, '2020-10', 0, 400, -200000, 350, 4.00, 40000);

-- ----------------------------
-- Table structure for t_team
-- ----------------------------
DROP TABLE IF EXISTS `t_team`;
CREATE TABLE `t_team`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `departmentid` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 16 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of t_team
-- ----------------------------
INSERT INTO `t_team` VALUES (1, '管理团队', 1);
INSERT INTO `t_team` VALUES (2, '外联团队', 3);
INSERT INTO `t_team` VALUES (3, '团队', 2);
INSERT INTO `t_team` VALUES (4, '操作3组', 5);
INSERT INTO `t_team` VALUES (5, '资源组', 6);
INSERT INTO `t_team` VALUES (6, '销售1组', 4);
INSERT INTO `t_team` VALUES (7, '销售2组', 4);
INSERT INTO `t_team` VALUES (8, '销售3组', 4);
INSERT INTO `t_team` VALUES (9, '操作1组', 5);
INSERT INTO `t_team` VALUES (10, '操作2组', 5);
INSERT INTO `t_team` VALUES (11, '销售1组', 8);
INSERT INTO `t_team` VALUES (12, '操作1组', 9);
INSERT INTO `t_team` VALUES (13, '管理团队', 7);
INSERT INTO `t_team` VALUES (14, '操作2组', 9);
INSERT INTO `t_team` VALUES (15, '销售2组', 8);

-- ----------------------------
-- Table structure for t_user
-- ----------------------------
DROP TABLE IF EXISTS `t_user`;
CREATE TABLE `t_user`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `phone` varchar(11) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of t_user
-- ----------------------------
INSERT INTO `t_user` VALUES (1, '徐竟浩', '13880605659', '123456');
INSERT INTO `t_user` VALUES (2, '黄瑶', '18140200036', '234567');

-- ----------------------------
-- Table structure for t_user_role
-- ----------------------------
DROP TABLE IF EXISTS `t_user_role`;
CREATE TABLE `t_user_role`  (
  `uid` int(11) NOT NULL,
  `rid` int(11) NOT NULL,
  PRIMARY KEY (`uid`, `rid`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of t_user_role
-- ----------------------------
INSERT INTO `t_user_role` VALUES (1, 1);
INSERT INTO `t_user_role` VALUES (2, 2);

-- ----------------------------
-- Table structure for t_wage
-- ----------------------------
DROP TABLE IF EXISTS `t_wage`;
CREATE TABLE `t_wage`  (
  `staffid` int(11) NOT NULL COMMENT '员工id',
  `staffname` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '姓名',
  `month` varchar(7) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '月份',
  `basicwage` int(11) UNSIGNED NOT NULL COMMENT '基本工资',
  `floatwage` int(11) UNSIGNED NOT NULL COMMENT '绩效工资',
  `award` int(11) NOT NULL COMMENT '月提成',
  `yearaward` int(11) NOT NULL COMMENT '年提成',
  `companyid` int(11) NOT NULL COMMENT '当月所在公司id',
  `companyname` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '公司名称',
  `teamid` int(11) NOT NULL COMMENT '当月所在团队id',
  `teamname` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '团队名称',
  `copname` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '职级',
  `copid` int(11) NOT NULL COMMENT '职级id',
  `departmentid` int(11) NOT NULL COMMENT '部门id',
  `departmentname` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '部门名称',
  `profit` int(11) NOT NULL COMMENT '月收益',
  PRIMARY KEY (`staffid`, `month`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of t_wage
-- ----------------------------
INSERT INTO `t_wage` VALUES (1, '徐峰', '2020-10', 350000, 220000, 142000, 20000, 1, '誉和旅社', 5, '资源组', '主管', 5, 6, '资源部', 1500000);
INSERT INTO `t_wage` VALUES (1, '徐峰', '2020-11', 350000, 213636, 154000, 127548, 1, '誉和旅社', 5, '资源组', '主管', 5, 6, '资源部', 1400000);
INSERT INTO `t_wage` VALUES (2, '刘敏', '2020-11', 800000, 341818, 330000, 248430, 1, '誉和旅社', 1, '管理团队', '总经理', 1, 1, '总经办', 3000000);
INSERT INTO `t_wage` VALUES (3, '李伟', '2020-11', 350000, 213636, 55000, 46098, 1, '誉和旅社', 2, '外联团队', '主管', 5, 3, '外联部', 500000);
INSERT INTO `t_wage` VALUES (4, '李伟', '2020-11', 300000, 150000, 26462, 10025, 1, '誉和旅社', 4, '操作3组', '组长', 6, 5, '操作部', 240566);
INSERT INTO `t_wage` VALUES (5, '赵敏', '2020-11', 350000, 250000, 29638, 16041, 1, '誉和旅社', 4, '操作3组', '主管', 5, 5, '操作部', 269434);
INSERT INTO `t_wage` VALUES (6, '李凯', '2020-11', 400000, 400000, 187000, 112686, 1, '誉和旅社', 6, '销售1组', '经理', 4, 4, '销售部', 1700000);
INSERT INTO `t_wage` VALUES (7, '雷东', '2020-11', 350000, 171250, 136000, 87619, 1, '誉和旅社', 7, '销售2组', '主管', 5, 4, '销售部', 1020000);
INSERT INTO `t_wage` VALUES (8, '丁蕾', '2020-10', 800000, 128000, 150000, -60408, 3, '匠印旅社', 13, '管理团队', '总经理', 1, 7, '总经办', -150000);
INSERT INTO `t_wage` VALUES (8, '刘总', '2020-11', 200000, 220000, 100000, 231231, 2, '风光旅社', 8, '管理团队', '总经理', 1, 7, '总经办', 2030000);
INSERT INTO `t_wage` VALUES (9, '菲戈', '2020-10', 350000, 95000, 120000, -60720, 3, '匠印旅社', 11, '销售1组', '主管', 5, 8, '销售部', -240000);
INSERT INTO `t_wage` VALUES (10, '曹睿', '2020-10', 300000, 45750, 90000, -28647, 3, '匠印旅社', 12, '操作1组', '组长', 6, 9, '操作部', -90000);
INSERT INTO `t_wage` VALUES (11, '白鹏', '2020-10', 300000, 127500, 80000, -19560, 3, '匠印旅社', 15, '销售2组', '组长', 6, 8, '销售部', 40000);
INSERT INTO `t_wage` VALUES (12, '赵信', '2020-10', 250000, 34250, 60000, -21033, 3, '匠印旅社', 14, '操作2组', '组员', 7, 9, '操作部', -60000);

SET FOREIGN_KEY_CHECKS = 1;
