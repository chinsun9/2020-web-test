-- MariaDB dump 10.17  Distrib 10.5.5-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: webtest
-- ------------------------------------------------------
-- Server version	10.5.5-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `webtest`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `webtest` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `webtest`;

--
-- Table structure for table `notice`
--

DROP TABLE IF EXISTS `notice`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `notice` (
  `idx` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(200) NOT NULL,
  `content` text NOT NULL,
  `write_name` varchar(30) NOT NULL,
  `use_flag` char(1) DEFAULT NULL,
  `count` int(11) NOT NULL,
  `insert_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `insert_idx` int(11) NOT NULL,
  `update_date` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE current_timestamp(),
  `update_idx` int(11) DEFAULT NULL,
  PRIMARY KEY (`idx`),
  KEY `FK_notice_insert_idx_user_idx` (`insert_idx`),
  KEY `FK_notice_update_idx_user_idx` (`update_idx`),
  CONSTRAINT `FK_notice_insert_idx_user_idx` FOREIGN KEY (`insert_idx`) REFERENCES `user` (`idx`),
  CONSTRAINT `FK_notice_update_idx_user_idx` FOREIGN KEY (`update_idx`) REFERENCES `user` (`idx`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notice`
--

LOCK TABLES `notice` WRITE;
/*!40000 ALTER TABLE `notice` DISABLE KEYS */;
INSERT INTO `notice` VALUES (5,'hello','123','admin_name','N',4,'2020-08-12 06:36:25',1,'2020-08-13 02:41:10',1),(6,'hello','123','admin_name','Y',1,'2020-08-12 06:36:45',1,'0000-00-00 00:00:00',1),(7,'hello','123','admin_name','N',2,'2020-08-12 06:43:44',1,'2020-08-13 02:50:06',1),(8,'hello','asd','admin_name','Y',0,'2020-08-12 06:44:11',1,'0000-00-00 00:00:00',1),(9,'asd','a','admin_name','Y',0,'2020-08-12 06:44:43',1,'0000-00-00 00:00:00',1),(10,'1','ad','admin_name','Y',2,'2020-08-12 06:45:22',1,'0000-00-00 00:00:00',1),(11,'a','aaa3','admin_name','Y',2,'2020-08-12 06:46:22',1,'2020-08-12 07:14:43',1),(12,'asd','aa','admin_name','Y',1,'2020-08-12 07:23:11',1,'0000-00-00 00:00:00',1),(13,'123','1','admin_name','N',0,'2020-08-12 07:25:10',1,'2020-08-12 07:30:06',1),(14,'asd','a','admin_name','N',0,'2020-08-12 07:26:13',1,'2020-08-12 07:29:57',1),(15,'a','a','admin_name','Y',2,'2020-08-12 07:54:02',1,'0000-00-00 00:00:00',1),(16,'a','a','admin_name','N',3,'2020-08-12 07:54:08',1,'2020-08-28 01:43:48',1),(17,'a','a','admin_name','N',8,'2020-08-12 08:00:34',1,'2020-08-13 02:36:49',1),(18,'나는홍길동','나는홍길동','홍길동','N',3,'2020-08-12 08:37:21',2,'2020-08-13 01:25:07',2),(19,'나는홍길동222','나는홍길동 수정222','홍길동','N',40,'2020-08-12 08:37:26',2,'2020-08-13 01:21:50',2),(20,'hello','ㅁㄴㅇㅇㅇㅇ','홍길동','N',4,'2020-08-13 01:26:24',2,'2020-08-13 01:29:37',2),(21,'ㅁ','ㅁ','홍길동','N',7,'2020-08-13 01:35:58',2,'2020-08-13 02:36:34',2),(22,'a','a','admin_name','N',3,'2020-08-13 02:38:09',1,'2020-08-28 01:39:45',1),(23,'asd','a','admin_name','N',4,'2020-08-13 02:43:19',1,'2020-08-28 01:24:51',1),(24,'asd','a','admin_name','N',4,'2020-08-13 02:53:44',1,'2020-08-28 01:08:35',1),(25,'ㄴㅁㅇㄴㅇㅁ','ㅁ','김철수','Y',3,'2020-08-13 03:01:43',4,'0000-00-00 00:00:00',4),(26,'철수의 공지사항2','ㅁ','김철수','Y',3,'2020-08-13 03:01:59',4,'0000-00-00 00:00:00',4),(27,'db구축사업 안내','ㅇㅇ','김철수','Y',7,'2020-08-13 03:02:18',4,'0000-00-00 00:00:00',4),(28,'12341234\'hjkjhk','123412341234ddddd\'jghbkjhgjhk','1234','N',2,'2020-08-13 03:41:56',13,'2020-08-13 03:42:13',13),(29,'hello','adsf','admin_name','Y',3,'2020-08-28 01:47:23',1,'0000-00-00 00:00:00',1),(30,'aaa','aaaㅁ','admin_name','Y',10,'2020-08-28 02:02:39',1,'2020-08-28 02:39:34',1);
/*!40000 ALTER TABLE `notice` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `idx` int(11) NOT NULL AUTO_INCREMENT,
  `uid` varchar(20) NOT NULL,
  `pass` varchar(20) NOT NULL,
  `user_name` varchar(30) DEFAULT NULL,
  `user_mail` varchar(30) DEFAULT NULL,
  `company_name` varchar(50) DEFAULT NULL,
  `company_address1` varchar(100) DEFAULT NULL,
  `company_address2` varchar(100) DEFAULT NULL,
  `user_state` char(1) NOT NULL,
  `insert_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `update_date` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE current_timestamp(),
  `update_uid` int(11) DEFAULT NULL,
  PRIMARY KEY (`idx`),
  UNIQUE KEY `UNIQUE_UID` (`uid`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'admin','1234','admin_name','admin@naver.com','admin_company','addr1','addr2','Y','2020-08-11 01:56:39','0000-00-00 00:00:00',NULL),(2,'asd1','1234','홍길동','asdf@asdd.cc','asdf','경기도 하남시 미사강변한강로 9','asd','Y','2020-08-12 03:52:13','2020-08-13 00:16:01',NULL),(4,'asd2','1234','김철수','asdf@asdd.cc','asdf','경기도 하남시 미사강변한강로 9','asd','Y','2020-08-12 03:55:18','2020-08-13 02:57:01',NULL),(5,'asd3','1234','박성재','asdf@asdd.cc','asdf','경기도 하남시 미사강변한강로 9','asd','Y','2020-08-12 03:55:39','2020-08-13 02:57:01',NULL),(7,'asd4','1234','영희','asdf@asdd.cc','asdf','경기도 하남시 미사강변한강로 9','asd','Y','2020-08-12 03:58:50','2020-08-13 02:57:01',NULL),(8,'asda1aa','qwe789**','asd','asdf@asdd.cc','asdf','경기도 하남시 미사강변한강로 9','asd','N','2020-08-12 03:59:12','0000-00-00 00:00:00',NULL),(12,'adminasd','qwe789**','a','asdf@asdd.cc','asdf','경기도 하남시 미사강변한강로 9','asd','N','2020-08-12 04:04:38','0000-00-00 00:00:00',NULL),(13,'1234','12341234a#','1234','1234@s.ff','1234','경기도 하남시 미사강변한강로 9','1234','Y','2020-08-13 03:39:32','2020-08-13 03:40:34',NULL);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-09-15 17:25:28
