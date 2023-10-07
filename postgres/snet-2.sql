--
-- PostgreSQL database dump
--

-- Dumped from database version 14.9
-- Dumped by pg_dump version 14.9

-- Started on 2023-09-22 01:23:02

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 3320 (class 0 OID 32813)
-- Dependencies: 212
-- Data for Name: transations; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.transations (id, "userId", date, "transationType", description, value, status) FROM stdin;
1	1	2023-09-14 18:45:21.985-03	Deposito	Saque pos ganho	50	CONCLUÍDO
2	1	2023-09-14 18:46:11.658-03	Deposito	saque 	30	CONCLUÍDO
3	1	2023-09-14 18:50:25.226-03	deposito	Deposito para aposta	250	CONCLUÍDO
4	1	2023-09-14 18:57:22.168-03	deposito	Deposito para aposta	250	CONCLUÍDO
5	1	2023-09-14 18:57:53.961-03	saque	Deposito para aposta	135.75	CONCLUÍDO
6	1	2023-09-14 18:58:45.693-03	Deposito	Teste	50	CONCLUÍDO
7	1	2023-09-14 18:58:56.977-03	Deposito	Teste	50	CONCLUÍDO
8	1	2023-09-14 18:59:42.771-03	Deposito	Teste	50	CONCLUÍDO
9	1	2023-09-14 19:02:09.984-03	Deposito	Teste 2	50	CONCLUÍDO
10	1	2023-09-14 19:02:45.143-03	Deposito	Testando 2	1.25	CONCLUÍDO
11	1	2023-09-14 22:19:56.944-03	Deposito	Deposito do jogo do bixo	30	CONCLUÍDO
12	1	2023-09-15 01:25:30.51-03	Deposito	Sorteio	10	CONCLUÍDO
13	1	2023-09-15 10:24:45.853-03	Deposito	Ganho do dia	50	CONCLUÍDO
14	14	2023-09-15 10:56:14.172-03	Deposito	Urubu do pix	50	CONCLUÍDO
15	1	2023-09-15 11:34:50.779-03	Deposito	Deposito Teste	300	CONCLUÍDO
16	1	2023-09-15 11:35:42.382-03	Deposito	Ganho do dia	75	CONCLUÍDO
17	1	2023-09-15 11:38:31.954-03	saque	Deposito para aposta	0.5	CONCLUÍDO
18	1	2023-09-15 11:38:55.826-03	saque	Deposito para aposta	50	CONCLUÍDO
19	1	2023-09-15 14:38:59.943-03	Saque	Saque teste	50	CONCLUÍDO
20	1	2023-09-15 14:50:18.807-03	Saque	teste	30	CONCLUÍDO
21	1	2023-09-21 13:34:25.583-03	deposito	Deposito para aposta	250	CONCLUÍDO
22	1	2023-09-21 22:51:06.196-03	deposito	Deposito para aposta	250	CONCLUÍDO
23	1	2023-09-21 22:51:26.015-03	saque	Deposito para aposta	50	CONCLUÍDO
24	1	2023-09-21 22:52:25.095-03	Saque	Jogo do Bicho	10	CONCLUÍDO
25	1	2023-09-21 22:53:37.862-03	Deposito	Ganho do dia	10	CONCLUÍDO
26	1	2023-09-21 23:46:41.45-03	Deposito	Jogo do dia	20	CONCLUÍDO
27	1	2023-09-21 23:47:13.795-03	Deposito	Deposito para viagem	500	CONCLUÍDO
\.


--
-- TOC entry 3318 (class 0 OID 32802)
-- Dependencies: 210
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."user" (id, name, gender, email, adress, phone, "passwordHash", saldo) FROM stdin;
19	Laís Oliveira	FEMININO	lais.oliveira.teste@gmail.com	Natal	923456789	$argon2id$v=19$m=4096,t=3,p=1$FEGYTJO8JUq8qIwVtDF4nA$wO9xGB3GskAmDI+/1SoR0uyM8kUNkA+WVwhul9+tJbw	0
2	Maria da Silva	FEMININO	maria.silva@gmail.com	São Paulo	998765432	$argon2id$v=19$m=4096,t=3,p=1$lfyu2PsZTQLCMOZWtp6I2w$XxhHkHlf8odmBVmKctDfM90k6I6zhxFjqswpUgcHhis	100.5
3	João Santos	MASCULINO	joao.santos@gmail.com	Rio de Janeiro	987654321	$argon2id$v=19$m=4096,t=3,p=1$zm7Fy5tCTMYCHPhc8ggLlw$7hyW2YTiDvzq0UT15X2MV6xHFyZOBdYG5WyS0fbjhJI	200.75
5	Lucas Rodrigues	MASCULINO	lucas.rodrigues@gmail.com	Fortaleza	934567890	$argon2id$v=19$m=4096,t=3,p=1$BRIWhYF52tgTq77banbNow$eeQPc685pLqOo9NRABEGZ8D5xg7tFkXM9yUjPTu9kLE	150.6
6	Carla Lima	FEMININO	carla.lima@gmail.com	Recife	945678901	$argon2id$v=19$m=4096,t=3,p=1$rS6841LQz2UOv0cwZ6M+iQ$H2Btk5Fxohc4LYgewb1g7950yeojUSPlWHr/cRdPS5w	70.3
7	Ana Lopes	FEMININO	ana.lopes@gmail.com	Curitiba	956789012	$argon2id$v=19$m=4096,t=3,p=1$S8qPkYZeOGK9EOukrkDonA$x0G5O1yCVQ8zT5Y9B+723CJcFJ0MKBcD7Q5av9OlyD0	90.1
8	Roberto Alves	MASCULINO	roberto.alves@gmail.com	Brasília	967890123	$argon2id$v=19$m=4096,t=3,p=1$jWbzPcShcBCWDoAqZCvWPg$+PreUjbhHfMDoNOyXUTMqT/aL6Qkv52B/6DtHYLuCoc	400.4
9	Márcio Nascimento	MASCULINO	marcio.nascimento@gmail.com	Porto Alegre	978901234	$argon2id$v=19$m=4096,t=3,p=1$NfLhXEi+8ADxV3riIQgIHQ$5vTR0TJa+0dVFZfqBE3K2zkhTYfulH/sa49yChn63LE	20.05
11	Lúcia Gonçalves	FEMININO	lucia.goncalves@gmail.com	Belém	990123456	$argon2id$v=19$m=4096,t=3,p=1$DzGQOSGYMLjcrOaWE1zxyw$NNhO6IpOnaSldyIRgCxHgz1gwECsmNYvYJGsrTN2N9k	250.9
12	Bruno Rocha	MASCULINO	bruno.rocha@gmail.com	Florianópolis	901234567	$argon2id$v=19$m=4096,t=3,p=1$M3WjxM9CF8ivU86Hm7HfAg$kU/EbC/6mtKoLV6XeoJu6nSAim8hmEcx6mCENB6gSvE	60.7
13	Carlos Ribeiro	MASCULINO	carlos.ribeiro@gmail.com	Vitória	912345678	$argon2id$v=19$m=4096,t=3,p=1$mEe1Ox4XMybIKT4ldSLihQ$3+WAE3ypNQRPnVGngSle7umKCydRpOQ/PIrM9b4+ozI	180.4
14	Laís Oliveira	FEMININO	lais.oliveira@gmail.com	Natal	923456789	$argon2id$v=19$m=4096,t=3,p=1$dIBg2Plhi++t+KUBAiyVvA$QzhA6fV+uidw6IArfTfSO/yseglHcI77d75lu/pUi9o	350.2
17	Manuel Gomes de Oliveira	MASCULINO	manuelGomes@gmail.com	90 Rua Lino Alves de Oliveira	83998027856	$argon2id$v=19$m=4096,t=3,p=1$P29VNdAdru5qlqThyb3Bmw$HzF6NKIG35dZCIecHL6G4gAU7cUVkYCk590WtlLR1DU	0
1	Leandro	MASCULINO	leandro@gmail.com	90 Rua Lino Alves de Oliveira	83 998027858	$argon2id$v=19$m=4096,t=3,p=1$pfaPOvAlevZAuDh64kzT1g$mZoMsApVfEasX8gx+NXTyGqYQoYnjM/PueKH28H71UE	1740
\.


--
-- TOC entry 3328 (class 0 OID 0)
-- Dependencies: 211
-- Name: transations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.transations_id_seq', 27, true);


--
-- TOC entry 3329 (class 0 OID 0)
-- Dependencies: 209
-- Name: user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.user_id_seq', 20, true);


-- Completed on 2023-09-22 01:23:02

--
-- PostgreSQL database dump complete
--

