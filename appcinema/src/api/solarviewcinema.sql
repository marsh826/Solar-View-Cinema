-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Jun 12, 2021 at 09:07 AM
-- Server version: 5.7.31
-- PHP Version: 7.3.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `solarviewcinema`
--

-- --------------------------------------------------------

--
-- Table structure for table `activitylog`
--

DROP TABLE IF EXISTS `activitylog`;
CREATE TABLE IF NOT EXISTS `activitylog` (
  `ActivityLogID` int(11) NOT NULL AUTO_INCREMENT,
  `IpAddress` varchar(400) NOT NULL,
  `DateAndTime` timestamp NOT NULL,
  `BrowserType` varchar(400) NOT NULL,
  `Action` varchar(400) NOT NULL,
  `UserID` int(11) DEFAULT NULL,
  PRIMARY KEY (`ActivityLogID`),
  KEY `userid` (`UserID`)
) ENGINE=InnoDB AUTO_INCREMENT=3039 DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `favouritemovie`
--

DROP TABLE IF EXISTS `favouritemovie`;
CREATE TABLE IF NOT EXISTS `favouritemovie` (
  `FavouriteMovieID` int(11) NOT NULL AUTO_INCREMENT,
  `MovieID` int(11) NOT NULL,
  `UserID` int(11) NOT NULL,
  PRIMARY KEY (`FavouriteMovieID`),
  KEY `movieinfavlist` (`MovieID`),
  KEY `favlistofuser` (`UserID`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `movie`
--

DROP TABLE IF EXISTS `movie`;
CREATE TABLE IF NOT EXISTS `movie` (
  `MovieID` int(11) NOT NULL AUTO_INCREMENT,
  `MovieName` varchar(500) NOT NULL,
  `ReleaseDate` date DEFAULT NULL,
  `MovieDescription` text,
  `Genre` varchar(150) DEFAULT NULL,
  `MovieImage` longtext,
  PRIMARY KEY (`MovieID`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;

--
-- Triggers `movie`
--
DROP TRIGGER IF EXISTS `removeSessionsBeforeDeleteMovie`;
DELIMITER $$
CREATE TRIGGER `removeSessionsBeforeDeleteMovie` BEFORE DELETE ON `movie` FOR EACH ROW Delete FROM moviesession WHERE moviesession.MovieID = old.MovieID
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `moviesession`
--

DROP TABLE IF EXISTS `moviesession`;
CREATE TABLE IF NOT EXISTS `moviesession` (
  `MovieSessionID` int(11) NOT NULL AUTO_INCREMENT,
  `SessionDate` date NOT NULL,
  `TimeStart` time NOT NULL,
  `MovieID` int(11) NOT NULL,
  PRIMARY KEY (`MovieSessionID`),
  KEY `movieforsession` (`MovieID`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;

--
-- Triggers `moviesession`
--
DROP TRIGGER IF EXISTS `createSeatsAfterSessionInsert`;
DELIMITER $$
CREATE TRIGGER `createSeatsAfterSessionInsert` AFTER INSERT ON `moviesession` FOR EACH ROW Insert into seatbysession(ReservationStatus, SeatID, MovieSessionID, TheatreID)
VALUES(false, 1, new.MovieSessionID, null),(false, 2, new.MovieSessionID, null), (false, 3, new.MovieSessionID, null), (false, 4, new.MovieSessionID, null), (false, 5, new.MovieSessionID, null), (false, 6, new.MovieSessionID, null), (false, 7, new.MovieSessionID, null), (false, 8, new.MovieSessionID, null), (false, 9, new.MovieSessionID, null), (false, 10, new.MovieSessionID, null),
(false, 11, new.MovieSessionID, null),(false, 12, new.MovieSessionID, null),(false, 13, new.MovieSessionID, null),(false, 14, new.MovieSessionID, null),(false, 15, new.MovieSessionID, null),(false, 16, new.MovieSessionID, null),(false, 17, new.MovieSessionID, null),(false, 18, new.MovieSessionID, null),(false, 19, new.MovieSessionID, null),(false, 20, new.MovieSessionID, null),(false, 21, new.MovieSessionID, null),(false, 22, new.MovieSessionID, null),
(false, 23, new.MovieSessionID, null),(false, 24, new.MovieSessionID, null),(false, 25, new.MovieSessionID, null)
$$
DELIMITER ;
DROP TRIGGER IF EXISTS `deleteSeatsAfterSession`;
DELIMITER $$
CREATE TRIGGER `deleteSeatsAfterSession` BEFORE DELETE ON `moviesession` FOR EACH ROW DELETE from seatbysession WHERE seatbysession.MovieSessionID = old.MovieSessionID
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `seat`
--

DROP TABLE IF EXISTS `seat`;
CREATE TABLE IF NOT EXISTS `seat` (
  `SeatID` int(11) NOT NULL AUTO_INCREMENT,
  `SeatNumber` varchar(20) NOT NULL,
  PRIMARY KEY (`SeatID`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `seat`
--

INSERT INTO `seat` (`SeatID`, `SeatNumber`) VALUES
(1, '1A'),
(2, '2A'),
(3, '3A'),
(4, '4A'),
(5, '5A'),
(6, '1B'),
(7, '2B'),
(8, '3B'),
(9, '4B'),
(10, '5B'),
(11, '1C'),
(12, '2C'),
(13, '3C'),
(14, '4C'),
(15, '5C'),
(16, '1D'),
(17, '2D'),
(18, '3D'),
(19, '4D'),
(20, '5D'),
(21, '1E'),
(22, '2E'),
(23, '3E'),
(24, '4E'),
(25, '5E');

-- --------------------------------------------------------

--
-- Table structure for table `seatbysession`
--

DROP TABLE IF EXISTS `seatbysession`;
CREATE TABLE IF NOT EXISTS `seatbysession` (
  `SeatBySessionID` int(11) NOT NULL AUTO_INCREMENT,
  `ReservationStatus` tinyint(1) DEFAULT NULL,
  `SeatID` int(11) NOT NULL,
  `MovieSessionID` int(11) NOT NULL,
  `TheatreID` int(11) DEFAULT NULL,
  PRIMARY KEY (`SeatBySessionID`),
  KEY `theatreseat` (`SeatID`),
  KEY `sessionmovie` (`MovieSessionID`),
  KEY `theatre` (`TheatreID`)
) ENGINE=InnoDB AUTO_INCREMENT=254 DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `theatre`
--

DROP TABLE IF EXISTS `theatre`;
CREATE TABLE IF NOT EXISTS `theatre` (
  `TheatreID` int(11) NOT NULL AUTO_INCREMENT,
  `TheatreNumber` int(10) NOT NULL,
  PRIMARY KEY (`TheatreID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `theatre`
--

INSERT INTO `theatre` (`TheatreID`, `TheatreNumber`) VALUES
(1, 1),
(2, 2),
(3, 3);

-- --------------------------------------------------------

--
-- Table structure for table `ticket`
--

DROP TABLE IF EXISTS `ticket`;
CREATE TABLE IF NOT EXISTS `ticket` (
  `TicketID` int(11) NOT NULL AUTO_INCREMENT,
  `TicketTypeID` int(11) NOT NULL,
  `SeatBySessionID` int(11) NOT NULL,
  `UserID` int(11) NOT NULL,
  PRIMARY KEY (`TicketID`),
  KEY `tickettype` (`TicketTypeID`),
  KEY `userofticket` (`UserID`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=latin1;

--
-- Triggers `ticket`
--
DROP TRIGGER IF EXISTS `updateReservationStatusDELETE`;
DELIMITER $$
CREATE TRIGGER `updateReservationStatusDELETE` BEFORE DELETE ON `ticket` FOR EACH ROW UPDATE seatbysession
SET seatbysession.ReservationStatus = 0
WHERE seatbysession.SeatBySessionID = old.SeatBySessionID
$$
DELIMITER ;
DROP TRIGGER IF EXISTS `updateReservationStatusINSERT`;
DELIMITER $$
CREATE TRIGGER `updateReservationStatusINSERT` AFTER INSERT ON `ticket` FOR EACH ROW UPDATE seatbysession
SET seatbysession.ReservationStatus = 1
WHERE seatbysession.SeatBySessionID = NEW.SeatBySessionID
$$
DELIMITER ;
DROP TRIGGER IF EXISTS `updateReservationStatusUPDATE`;
DELIMITER $$
CREATE TRIGGER `updateReservationStatusUPDATE` AFTER UPDATE ON `ticket` FOR EACH ROW UPDATE seatbysession
SET seatbysession.ReservationStatus = 0
WHERE seatbysession.SeatBySessionID = old.SeatBySessionID
$$
DELIMITER ;
DROP TRIGGER IF EXISTS `updateReservationStatusUPDATE2`;
DELIMITER $$
CREATE TRIGGER `updateReservationStatusUPDATE2` AFTER UPDATE ON `ticket` FOR EACH ROW UPDATE seatbysession
SET seatbysession.ReservationStatus = 1
WHERE seatbysession.SeatBySessionID = new.SeatBySessionID
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `tickettype`
--

DROP TABLE IF EXISTS `tickettype`;
CREATE TABLE IF NOT EXISTS `tickettype` (
  `TicketTypeID` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(30) NOT NULL,
  `Price` decimal(10,2) NOT NULL,
  PRIMARY KEY (`TicketTypeID`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tickettype`
--

INSERT INTO `tickettype` (`TicketTypeID`, `Name`, `Price`) VALUES
(1, 'Children', '12.00'),
(2, 'Adult', '15.00'),
(3, 'Senior', '12.50'),
(4, 'Student', '13.50');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `UserID` int(11) NOT NULL AUTO_INCREMENT,
  `FirstName` varchar(250) NOT NULL,
  `LastName` varchar(250) NOT NULL,
  `DateOfBirth` date DEFAULT NULL,
  `Email` varchar(250) NOT NULL,
  `Phone` varchar(24) NOT NULL,
  `Username` varchar(250) NOT NULL,
  `Password` varchar(150) NOT NULL,
  `AccessRight` varchar(150) DEFAULT NULL,
  PRIMARY KEY (`UserID`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`UserID`, `FirstName`, `LastName`, `DateOfBirth`, `Email`, `Phone`, `Username`, `Password`, `AccessRight`) VALUES
(7, 'you', 'me', '2021-05-29', 'A@gmail.com', '02132454989', 'whoryou', '$2y$10$lxLIii1Z3WpdgybxZlk.s.w0/0e4wJfBlGLAB5HQOjkKyC2OWCKeS', NULL),
(9, 'hanate', 'civic', '2021-05-12', 'admin@gmail.com', '0807345678', 'hanate', '$2y$10$KjyvsFCqaT25LiYiMAOxb.YnpwVUEsGo46j8x9kwV9I7qKt4gG0Ha', 'Administrator');

--
-- Triggers `users`
--
DROP TRIGGER IF EXISTS `DeleteTicketOnUserDelete`;
DELIMITER $$
CREATE TRIGGER `DeleteTicketOnUserDelete` BEFORE DELETE ON `users` FOR EACH ROW DELETE from ticket 
WHERE ticket.UserID = old.UserID
$$
DELIMITER ;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `activitylog`
--
ALTER TABLE `activitylog`
  ADD CONSTRAINT `userid` FOREIGN KEY (`UserID`) REFERENCES `users` (`UserID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `favouritemovie`
--
ALTER TABLE `favouritemovie`
  ADD CONSTRAINT `favlistofuser` FOREIGN KEY (`UserID`) REFERENCES `movie` (`MovieID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `movieinfavlist` FOREIGN KEY (`MovieID`) REFERENCES `movie` (`MovieID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `moviesession`
--
ALTER TABLE `moviesession`
  ADD CONSTRAINT `movieforsession` FOREIGN KEY (`MovieID`) REFERENCES `movie` (`MovieID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `seatbysession`
--
ALTER TABLE `seatbysession`
  ADD CONSTRAINT `sessionmovie` FOREIGN KEY (`MovieSessionID`) REFERENCES `moviesession` (`MovieSessionID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `theatre` FOREIGN KEY (`TheatreID`) REFERENCES `theatre` (`TheatreID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `theatreseat` FOREIGN KEY (`SeatID`) REFERENCES `seat` (`SeatID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `ticket`
--
ALTER TABLE `ticket`
  ADD CONSTRAINT `tickettype` FOREIGN KEY (`TicketTypeID`) REFERENCES `tickettype` (`TicketTypeID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `userofticket` FOREIGN KEY (`UserID`) REFERENCES `users` (`UserID`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
