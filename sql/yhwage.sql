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

 Date: 27/10/2020 11:15:16
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
  `basicwage` int(11) NOT NULL COMMENT '基础工资',
  `floatwage` int(11) NOT NULL COMMENT '浮动工资',
  `monthratio` double(11, 6) NOT NULL COMMENT '月比例',
  `yearratio` double(11, 6) NOT NULL COMMENT '年比例',
  `ismanager` tinyint(1) NOT NULL COMMENT '是否是管理层',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 12 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for t_company
-- ----------------------------
DROP TABLE IF EXISTS `t_company`;
CREATE TABLE `t_company`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '公司名称',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

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
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

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
  `companyid` int(11) NOT NULL COMMENT '所属公司',
  `teamid` int(11) NULL DEFAULT NULL COMMENT '所属团队，总经理级没有团队id',
  `copid` int(11) NOT NULL COMMENT '对应职级',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for t_task
-- ----------------------------
DROP TABLE IF EXISTS `t_task`;
CREATE TABLE `t_task`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `teamid` int(11) NOT NULL,
  `month` varchar(7) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `profit` int(11) NULL DEFAULT NULL COMMENT '利润',
  `tourists` int(11) NULL DEFAULT NULL COMMENT '流量',
  `actualprofit` int(11) NULL DEFAULT NULL COMMENT '实际利润',
  `actualtourists` int(11) NULL DEFAULT NULL COMMENT '实际流量',
  `actualscore` double(11, 2) NULL DEFAULT NULL COMMENT '实际评分',
  `othercost` int(11) NULL DEFAULT NULL COMMENT '其他成本',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `index_team_month`(`teamid`, `month`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for t_team
-- ----------------------------
DROP TABLE IF EXISTS `t_team`;
CREATE TABLE `t_team`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `companyid` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

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
-- Table structure for t_user_role
-- ----------------------------
DROP TABLE IF EXISTS `t_user_role`;
CREATE TABLE `t_user_role`  (
  `uid` int(11) NOT NULL,
  `rid` int(11) NOT NULL,
  PRIMARY KEY (`uid`, `rid`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

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
  `award` int(11) UNSIGNED NOT NULL COMMENT '月提成',
  `yearaward` int(11) UNSIGNED NOT NULL COMMENT '年提成',
  `companyid` int(11) NOT NULL COMMENT '当月所在公司id',
  `companyname` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '公司名称',
  `teamid` int(11) NULL DEFAULT NULL COMMENT '当月所在团队id',
  `teamname` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '团队名称',
  `copname` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '职级',
  `copid` int(11) NOT NULL COMMENT '职级id',
  PRIMARY KEY (`staffid`, `month`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

SET FOREIGN_KEY_CHECKS = 1;
