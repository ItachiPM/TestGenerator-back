-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Wersja serwera:               10.4.18-MariaDB - mariadb.org binary distribution
-- Serwer OS:                    Win64
-- HeidiSQL Wersja:              11.3.0.6295
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

-- Zrzut struktury tabela test_generator.modules
CREATE TABLE IF NOT EXISTS `modules` (
  `module` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`module`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Zrzucanie danych dla tabeli test_generator.modules: ~3 rows (około)
/*!40000 ALTER TABLE `modules` DISABLE KEYS */;
INSERT INTO `modules` (`module`) VALUES
	('Chemia'),
	('Filmy i seriale'),
	('Zabawne');
/*!40000 ALTER TABLE `modules` ENABLE KEYS */;

-- Zrzut struktury tabela test_generator.questions
CREATE TABLE IF NOT EXISTS `questions` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT uuid(),
  `question` varchar(300) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `correctAnswer` varchar(300) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `badAnswer1` varchar(300) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `badAnswer2` varchar(300) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `badAnswer3` varchar(300) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `module` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `FK_question_modules` (`module`),
  CONSTRAINT `FK_question_modules` FOREIGN KEY (`module`) REFERENCES `modules` (`module`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Zrzucanie danych dla tabeli test_generator.questions: ~30 rows (około)
/*!40000 ALTER TABLE `questions` DISABLE KEYS */;
INSERT INTO `questions` (`id`, `question`, `correctAnswer`, `badAnswer1`, `badAnswer2`, `badAnswer3`, `module`) VALUES
	('0ed8ee0f-3cbc-4278-9a8a-2ab4ab0ff43d', 'Ile jest filmów w serii Harry Potter ?', '8', '7', '3', '9', 'Filmy i seriale'),
	('110dacb1-e8e3-4e5d-aad8-3acad0ce5d9a', 'Jaka jest temperatura parowania wody (w stopniach celsjusza)', '100', '90', '500', '50', 'Chemia'),
	('11ab5ca2-d07f-492d-a03f-338f80ca763a', 'jaka to jest reakcja egzotermiczna', 'reakcja w wyniku której ciepło jest oddawane do otoczenia', 'reakcja w wyniku której ciepło jest odbierane od otoczenia', 'reakcja w wyniku której ciepło ani nie jest odbierane od otoczenia ani nie jest do niego oddawane', NULL, 'Chemia'),
	('24addf51-80c3-4c68-bb2b-9654fcc4d3fb', ' W jaki sposób inhibitor wpływa na przebieg reakcji chemicznej', 'spowalnia ją', 'przyspiesza ją', 'wzmacnia ją', 'równoważy ją', 'Chemia'),
	('4ab87dfa-2d39-44d2-a38f-d16b5d88c3c5', 'Gdzie leży Paczambaj', 'Na Ziemi', 'W Afryce ', 'W Azji', 'W Ameryce Południowej', 'Zabawne'),
	('59dcff1c-24ad-4915-8872-d398d895b072', 'Jaki koń widzi tak samo z tyłu i z przodu ', 'Ślepy', 'W okularach', 'Spostrzegawczy', NULL, 'Zabawne'),
	('5bf7754c-8375-4964-82bc-8c6f0a01e82b', 'W którym roku został nakręcony Avatar', '2009', '2011', '2006', '2008', 'Filmy i seriale'),
	('5ce090b6-496c-4f1e-be02-4a7ac0fbe782', 'Pierw płatki czy mleko ?', 'Miska', 'Płatki', 'Mleko', NULL, 'Zabawne'),
	('5f03a3e2-f3ce-4cf0-a1a1-3676da9b8249', 'Jaki ładunek ma elektron', '-', '+', 'neutralny', NULL, 'Chemia'),
	('68030405-a939-418c-b72a-aca125adca05', 'Wskaż poprawną definicję węglowodorów', 'WĘGLOWODORY są to związki węgla z wodorem, w których cząsteczkach atomy węgla łączą się bezpośrednio ze sobą. Węgiel w tych związkach jest zawsze czterowartościowy. Atomy węgla łączą się ze sobą tworząc łańcuchy proste lub rozgałęzione oraz pierścienie.', 'WĘGLOWODORY są to związki węgla z wodorem i tlenem, w których cząsteczkach atomy węgla łączą się bezpośrednio ze sobą. Węgiel w tych związkach jest zawsze czterowartościowy. Atomy węgla łączą się ze sobą tworząc łańcuchy proste lub rozgałęzione oraz pierścienie.', 'WĘGLOWODORY są to związki węgla z wodą, w których cząsteczkach atomy węgla łączą się bezpośrednio z tlenem w cząsteczce wody. Węgiel w tych związkach jest zawsze czterowartościowy. Atomy węgla łączą się ze sobą tworząc łańcuchy proste lub rozgałęzione oraz pierścienie.', 'WĘGLOWODORY są to związki węgla z wodorem i tlenem, w których cząsteczkach atomy węgla łączą się bezpośrednio ze sobą. Węgiel w tych związkach jest różnowartościowy. Atomy węgla łączą się ze sobą tworząc łańcuchy proste lub rozgałęzione oraz pierścienie.', 'Chemia'),
	('6de032fb-0881-46cf-95fc-7824d8ae5524', 'Co nie jest odmianą alotropową węgla ', 'deuter', 'grafit', 'grafen', 'diament', 'Chemia'),
	('718dce71-562d-4327-abf7-0d93c219cf9a', 'Jak nazywa się antynagroda przyznawana najgorszym ﬂlmom, która “uzupełnia” Oscary', 'Złota Malina', 'Anty oscar', 'Nagroda grammy', 'Złoty but', 'Filmy i seriale'),
	('742a6565-5d40-45f7-bd3b-704b36c3dd71', 'Czy ryba ma rzęsy', 'Nie', 'Tak', 'Tak takie z łusek', 'nie wiem', 'Zabawne'),
	('77ae2c85-09a0-444a-bc25-5f2b367e23c2', 'Czy Will Smith wygrał kiedyś Oscara', 'Tak', 'Nie', NULL, NULL, 'Filmy i seriale'),
	('9181121f-eacb-4195-9578-2f87e4b86865', 'Czy Ross z Rahel zrobili sobie przerwę', 'Ross twierdzi że tak, a Rahel twierdzi że nie ', 'tak', 'nie', NULL, 'Filmy i seriale'),
	('918bf289-d8a4-4adc-b405-9e64db8418a7', 'Który z aktorów nie zagrał roli Batmana', 'Chris Evans', 'Christian Bale', 'Ben Affleck', 'Michael Keaton', 'Filmy i seriale'),
	('96383ff3-aea1-42f2-b10c-baa8f6d8f045', 'Jak miał na imię Eugeniusz', 'Eugeniusz', 'Janusz', 'Marek', 'Robert', 'Zabawne'),
	('aaa5c802-6332-471c-a279-94fdc3de577b', 'Który z tytułowych bohaterów serialu Rick i Morty jest naukowcem', 'Rick', 'Morty', NULL, NULL, 'Filmy i seriale'),
	('aafc4bbb-87e0-4d5c-a511-273fc9d7847a', 'Ile zostało nakręconych filmów o przygodach Jamesa Bonda', '28', '19', '33', '39', 'Filmy i seriale'),
	('b6bbee22-f200-4618-81b8-c2f0eb33b14e', 'Podaj drugą stronę równania: H2SO4 + 2NaCl', 'Na2SO4 + 2HCl', 'Na2SO4 + H2Cl2', '2Na2SO4 + 2H2Cl', 'Na2SO4 + HCl', 'Chemia'),
	('ba001afb-6650-4673-88e0-5c9cdb3723e1', 'Rodzaj wiązania między atomami w cząsteczce wody to', 'kowalencyje spolaryzowane', 'koordynacyjne', 'jonowe', 'kowalencyjne nespolaryzowane', 'Chemia'),
	('be780d46-433d-45a8-a632-b63241fdd20e', 'Za 5 lat ', 'Będę o 5 lat starszy', 'Robert Lewandowski zdobędzie złotą piłkę', 'Inflacja będzie wynosić 50%', 'Wszystko będzie tak samo', 'Zabawne'),
	('cd45d0fb-5805-49f5-99c4-a0216a179c21', 'Jaka Kaczka chodzi na dwóch nogach', 'Kaczka', 'Kaczka Dziwaczka', 'Kaczor Donald', 'Brzydkie Kaczątko', 'Zabawne'),
	('d49cc4c0-3e8b-488b-9cc0-9124d5d091ef', 'Substancja o pH równym 11 będzie miała odczyn', 'zasadowy', 'kwasowy', 'obojętny', NULL, 'Chemia'),
	('d5eca504-7ee1-4070-bba1-010fb9bf1885', 'Kto jest synem Twojego ojca, ale nie jest Twoim rodzeństwem', 'Adoptowany syn', 'Brat', 'Wredny Brat', 'Samochód ojca', 'Zabawne'),
	('e187412e-ff44-4e0f-bcd4-6f24e6dae6c8', 'W którym roku Titanic zatonął na Oceanie Atlantyckim 15 kwietnia podczas dziewiczej podróży z Southampton?', '1912', '1915', '1913', '1914', 'Filmy i seriale'),
	('e9c7a7a0-3b89-49c7-9976-4099c2963cda', 'Ile oscarów zdobył Leonadro DiCaprio', '1', '0', '2', '9', 'Filmy i seriale'),
	('eca1f23e-b54f-48b4-9498-cc50ff0f1359', 'Zaznacz poprawnie zapisane pierwiastki z ich symbolami', 'Miedź - CU, - Glin - AL, - Magnez - MG', 'Miedź - ME, - Glin - C, - Magnez - MN', 'Miedź - CD, - Glin - H, Magnez - CU', 'Miedź - CU, Glin - ML, - Magnez - MA', 'Chemia'),
	('f5bc4598-27d1-444a-8b17-b3b9786ca373', 'ile jeż ma kolców', '68552', '12300404', '120390194', '4', 'Zabawne'),
	('f679a995-5be2-4a49-a00e-35e040b32921', 'ile to jest kobiałka', 'nie wiem', '2 kg', NULL, NULL, 'Zabawne');
/*!40000 ALTER TABLE `questions` ENABLE KEYS */;

-- Zrzut struktury tabela test_generator.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT uuid(),
  `login` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `pwdHash` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Zrzucanie danych dla tabeli test_generator.users: ~1 rows (około)
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` (`id`, `login`, `pwdHash`) VALUES
	('04c832f0-f530-11ec-bcd5-c85b76bc00cc', 'asd', '070ba7aac1d7b7ae52ac78d96ca92480712adc1196ee8663623f42649ccb8cdf1f55d775d4f528c1bcd6d70ba9669521d42541f0aa602132466fc66c8027664d');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
