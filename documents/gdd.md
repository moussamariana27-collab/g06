<img src="/assets/inteli.png">


# GDD - Game Design Document - Módulo 1 - Inteli

## Nome do Grupo

#### Nomes dos integrantes do grupo



## Sumário

[1. Introdução](#c1)

[2. Visão Geral do Jogo](#c2)

[3. Game Design](#c3)

[4. Desenvolvimento do jogo](#c4)

[5. Casos de Teste](#c5)

[6. Conclusões e trabalhos futuros](#c6)

[7. Referências](#c7)

[Anexos](#c8)

<br>


# <a name="c1"></a>1. Introdução (sprints 1 a 4)

## 1.1. Plano Estratégico do Projeto

### 1.1.1. Contexto da indústria (sprint 2)

Cenário de Mercado e Estratégia da Cielo S.A.

O mercado brasileiro de pagamentos apresenta forte concorrência entre adquirentes tradicionais, como Cielo e Rede, e fintechs voltadas a PMEs, como Stone e PagSeguro, que integram contas digitais e ferramentas de gestão (Biz, 2024). Nesse contexto, a Cielo passou por reestruturação após o fechamento de capital em 2024 e iniciou uma transição de um modelo centrado em terminais físicos para uma plataforma de dados e serviços financeiros (InfoMoney, 2024; Cielo, 2024).

Para enfrentar substitutos como o Pix, a empresa investe em interoperabilidade, incluindo pagamentos via QR Code integrados aos terminais e soluções de gestão e análise de dados para aumentar a fidelização dos lojistas (Valor Econômico, 2023; Suno Notícias, 2024). Para 2025–2026, a estratégia inclui Tap to Phone, Pix Automático e maior uso de inteligência artificial para recuperar margens e manter competitividade (InvestNews, 2025; Mobile Time, 2025).

### 1.1.1.1. Modelo de 5 Forças de Porter (sprint 2)

As Forças de Porter são um modelo de análise criado por Michael Porter que tem como objetivo avaliar o nível de competitividade de um setor. O modelo identifica cinco forças que influenciam o mercado: a rivalidade entre concorrentes, o poder de barganha dos clientes, o poder de barganha dos fornecedores, a ameaça de novos entrantes e a ameaça de produtos substitutos. A partir dessa análise, as empresas conseguem compreender melhor o ambiente competitivo e desenvolver estratégias para se posicionar de forma mais eficiente e obter vantagem competitiva.

####  Ameaça de Novos Entrantes no Mercado Brasileiro de Maquininhas
O mercado brasileiro de adquirência — popularmente conhecido como mercado de “maquininhas” — passou por mudanças estruturais significativas nas últimas duas décadas. Antes concentrado em poucos agentes, como a Cielo e a Rede, o setor tornou-se mais competitivo após alterações regulatórias e avanços tecnológicos (Banco Central do Brasil [BCB], 2010). Nesse contexto, a análise da ameaça de novos entrantes, proposta no modelo das Cinco Forças de Porter (2004), torna-se fundamental para compreender a dinâmica competitiva atual.

Segundo Porter (2004), a ameaça de novos entrantes depende da existência de barreiras estruturais que dificultam o ingresso no setor. No mercado de maquininhas, destacam-se três principais barreiras: investimento inicial, regulação e economias de escala.

Primeiramente, o ingresso exige elevado investimento em tecnologia de processamento de pagamentos, sistemas antifraude, segurança da informação e estrutura operacional. Além disso, as empresas precisam cumprir exigências regulatórias estabelecidas pelo Banco Central, incluindo autorização para funcionamento como instituição de pagamento e adequação às normas de prevenção à lavagem de dinheiro (BCB, 2013).

Outro fator relevante é a economia de escala. Empresas consolidadas como Stone, PagSeguro e Getnet operam com grande volume transacionado, o que reduz o custo médio por operação e fortalece seu poder de negociação com bandeiras e instituições financeiras (ABECS, 2023). Essa escala representa uma barreira significativa para novos competidores que pretendem disputar mercado apenas por preço.

Apesar das barreiras estruturais, alguns fatores recentes reduziram a dificuldade de ingresso no setor. O avanço tecnológico e a digitalização dos serviços financeiros permitiram o surgimento de fintechs com modelos operacionais mais enxutos e digitais (ABECS, 2023).

Adicionalmente, a implementação do sistema de pagamentos instantâneos PIX pelo Banco Central ampliou a concorrência no mercado de pagamentos eletrônicos, incentivando inovação e reduzindo dependências tradicionais do cartão (BCB, 2020). Esse ambiente regulatório mais aberto estimulou a entrada de novos participantes e aumentou a contestabilidade do setor.

A ameaça de novos entrantes no mercado brasileiro de maquininhas pode ser classificada como moderada. Embora existam barreiras relevantes relacionadas a capital, regulação e escala, avanços tecnológicos e mudanças regulatórias reduziram obstáculos históricos. Conforme o modelo das Cinco Forças de Porter (2004), esse cenário contribui para intensificar a rivalidade e pressionar margens, tornando o setor cada vez mais dinâmico e competitivo.

#### Poder de Barganha dos Fornecedores na Indústria de Meios de Pagamento
Identificação dos principais fornecedores da indústria
A Cielo atua no setor de adquirência e tecnologia para meios de pagamento, dependendo de fornecedores estratégicos em três categorias principais: bandeiras de cartão, infraestrutura tecnológica (computação em nuvem) e fornecedores de hardware (maquininhas). A análise desses fornecedores permite compreender o grau de poder de barganha exercido sobre a empresa e sobre a indústria como um todo.
##### Bandeiras de cartão
De acordo com dados recentes sobre participação de mercado no Brasil, as principais bandeiras são Mastercard (51%), Visa (31%) e Elo (14%), enquanto outras bandeiras somam aproximadamente 3% (YourPay, 2024). Observa-se que Mastercard e Visa concentram juntas mais de 80% do mercado, o que evidencia elevada concentração e reduzido número de fornecedores relevantes nesse segmento.

Essa concentração aumenta significativamente o poder de barganha das bandeiras, uma vez que as adquirentes dependem da autorização e do credenciamento dessas empresas para processar pagamentos. A substituição dessas bandeiras não é viável, dado o nível de aceitação e preferência dos consumidores.
##### Parceiros tecnológicos (infraestrutura de nuvem)
No segmento de infraestrutura de nuvem, o mercado é liderado por três grandes empresas: Amazon Web Services (AWS), Microsoft Azure e Google Cloud Platform, que juntas concentram aproximadamente 65% do mercado global (Megaport, 2024). A Microsoft, inclusive, mantém parceria estratégica com a Cielo para fornecimento de infraestrutura tecnológica (Microsoft, 2023).

A elevada concentração do setor, aliada aos altos custos de migração entre provedores de nuvem (switching costs), fortalece o poder de barganha desses fornecedores. A troca de fornecedor envolve custos financeiros, riscos operacionais e necessidade de reestruturação tecnológica, o que limita a capacidade de negociação das adquirentes.
##### Fornecedores de hardware
No fornecimento de maquininhas de cartão (POS), destacam-se empresas como Verifone e Ingenico no cenário internacional, além da Pax Technologies, líder no Brasil. A produção de equipamentos para o mercado nacional também envolve a Transire, maior fabricante de maquininhas fora da China (InfoMoney, 2023).

Assim como nos demais segmentos, há dependência tecnológica e custos elevados de substituição de fornecedores, o que reforça o poder de barganha dessas empresas. A padronização tecnológica e a necessidade de certificações específicas dificultam a entrada de novos fabricantes.
#### Análise do poder de barganha dos fornecedores e impacto na indústria
Com base na análise das três categorias, verifica-se que os principais fornecedores da Cielo são grandes empresas globais com forte concentração de mercado. Essa característica estrutural eleva o poder de barganha dos fornecedores, pois: Há baixa quantidade de alternativas relevantes, os custos de troca são elevados, os fornecedores detêm tecnologias essenciais ao funcionamento do negócio e a dependência é estrutural e comum a todas as adquirentes do setor.

Dessa forma, o setor de adquirência apresenta forte influência dos fornecedores estratégicos, especialmente das bandeiras e dos provedores de nuvem. Esse cenário impacta diretamente as margens das empresas, reduz sua capacidade de negociação e contribui para a intensificação da rivalidade competitiva na indústria.
#### Poder de Barganha dos Clientes na Indústria de Meios de Pagamento


A Cielo atende pouco mais de 1.2 milhões de clientes que vão do pequeno empreendedor ao grande varejista (ALMAP BBDO, 2025). Por isso, a própria empresa possui uma estratégia de segmentação de mercado, para classificar cada cliente de acordo com suas necessidades. Essa segmentação se dá de duas formas: por porte (Mobile Time, 2022) e por setor (Cielo, 2025).

##### Segmentação por porte 
Microempreendedores Individuais (MEI)
O grupo dos microempreendedores individuais é constituído por pequenas operações com baixo volume de vendas, como autônomos e pequenos negócios. Apesar da importância numérica desse segmento, o poder de barganha individual desses clientes é limitado, uma vez que nenhum representa uma fatia significativa do faturamento total da empresa (CNN, 2022). No entanto, coletivamente, esse segmento pode exercer influência caso ocorram migrações em massa para serviços concorrentes.
##### Microempresas, Pequenas e Médias Empresas (PMEs)
As PMEs constituem parte fundamental da base de clientes da Cielo, representando um grande número de usuários que buscam soluções de pagamento adaptadas a negócios menores. A empresa oferece variadas soluções tecnológicas que atendem desde o pequeno varejo até empresas de porte médio, reforçando sua estratégia de atuação ampla em vários segmentos do mercado.

Individualmente, esses clientes possuem baixo poder de barganha no mercado devido ao grande número de empresas desse tipo. Entretanto, coletivamente, podem exercer um poder maior frente à concorrência, especialmente se houver opções alternativas de adquirência disponíveis.
##### Grandes Contas
Grandes contas são empresas com alto volume de transações e representatividade no faturamento total de pagamentos processados (Moody’s, 2024). A Cielo possui soluções customizadas para esse segmento, incluindo atendimento dedicado e soluções que levam em conta as necessidades específicas desses grandes clientes (Cielo, 2023).
Clientes desse porte tendem a possuir alto poder de barganha, pois representam uma parcela significativa das receitas da Cielo e, portanto, podem negociar condições comerciais mais favoráveis.
##### E-commerce ( Qualquer porte )
O segmento de e-commerce engloba lojas virtuais, marketplaces e vendedores online que utilizam soluções digitais de pagamento. A Cielo oferece plataformas de integração para e-commerce, como APIs e links de pagamento, ajudando empreendedores a vender online com segurança e eficiência (Cielo, 2025).

Devido à facilidade de troca entre uma plataforma de pagamento e outra no ambiente digital, esses clientes possuem um poder de barganha moderado — maior do que pequenos negócios isolados, mas menor do que grandes contas físicas — uma vez que mudanças de fornecedor podem ocorrer com custo relativamente baixo.

##### Segmentação por setor
O Índice Cielo do Varejo Ampliado (ICVA) acompanha mensalmente a evolução do varejo brasileiro, de acordo com as vendas realizadas em 18 setores mapeados pela Cielo, desde pequenos lojistas a grandes varejistas. Eles respondem por mais de 870 mil clientes varejistas que vendem com a Cielo (2025).

##### Considerações finais
O poder de barganha dos clientes na indústria de adquirência varia conforme o porte e o perfil do cliente. Micro e pequenas empresas apresentam baixo poder individual, grandes contas exercem influência significativa sobre preços e condições comerciais e o segmento de e-commerce intensifica a competitividade devido às baixas barreiras de troca entre fornecedores.

#### Análise da ameaça de produtos ou serviços substitutos

No cenário brasileiro, o setor de adquirência é consolidado por empresas como Mercado Pago, PagSeguro (PagBank), Stone, Ton, InfinitePay, Cielo, Getnet, SumUp e C6 Pay. Segundo o portal Consumidor Moderno (2018), essas organizações são as principais precursoras de inovações tecnológicas no mercado nacional, introduzindo métodos como pagamentos por aproximação (Near Field Communication - NFC), biometria, leitura de QR Codes e integração com carteiras digitais.

Entretanto, a principal ameaça de substituição não provém apenas de novas tecnologias de hardware, mas de mudanças estruturais no sistema de pagamentos. O surgimento e a rápida adoção do Pix representa um desafio direto ao modelo de negócios das maquininhas. Conforme aponta a análise do InfoMoney (2023), as transferências instantâneas têm apresentado um crescimento exponencial, oferecendo custos menores para os lojistas e conveniência para os consumidores, o que posiciona o sistema de pagamentos instantâneos como o principal substituto das transações tradicionais feitas por maquininhas.

#### Análise Geral da Rivalidade entre os Concorrentes Existentes
O mercado brasileiro de maquininhas de cartão apresenta alto nível de rivalidade competitiva, impulsionado pela presença de grandes empresas consolidadas e pela entrada contínua de fintechs com propostas inovadoras. Em 2024, o ranking dos principais participantes do setor indicava o PagBank como líder de mercado, seguido por Cielo, Stone e Rede, evidenciando um ambiente competitivo marcado pela disputa por taxas mais atrativas, tecnologia e integração de serviços financeiros (Exame, 2024).

Fintechs como PagBank, Mercado Pago e SumUp vêm ampliando sua presença ao investir em inteligência artificial, análise de dados e segurança digital, além de oferecer ecossistemas integrados que incluem conta digital, ferramentas de gestão e soluções de pagamento. Esse movimento aumenta a complexidade competitiva do setor e exige maior capacidade tecnológica das empresas. Paralelamente, cresce a adoção da tecnologia Tap to Pay, que permite transformar smartphones em maquininhas de pagamento, tendência que tende a ampliar ainda mais a pressão competitiva sobre os modelos tradicionais (Pininfarina Brasil, 2025).

Rankings especializados indicam que as maquininhas mais competitivas atualmente combinam baixas taxas, tecnologia avançada e simplicidade operacional. Nesse contexto, PagBank, Ton, Mercado Pago e SumUp figuram entre as principais referências do mercado (Educando Seu Bolso, 2025; iDinheiro, 2025). Em contraste, análises comparativas mostram que as maquininhas da Cielo não aparecem entre as dez melhores opções nesses rankings, sugerindo uma perda relativa de competitividade frente às fintechs digitais (Educando Seu Bolso, 2025; iDinheiro, 2025). Ainda assim, alguns levantamentos indicam a Cielo entre as sete principais empresas do setor, demonstrando que a companhia mantém relevância institucional apesar da pressão competitiva (iDinheiro, 2025).

A chamada “guerra das maquininhas” descreve a intensificação dessa disputa entre credenciadoras. Historicamente dominado por Cielo e Rede, o setor passou a registrar a entrada de fintechs como PagSeguro, Stone e Getnet, que atraíram clientes por meio de taxas menores, antecipação de recebíveis mais rápida e inovação em produtos digitais (Concil, 2019; Bloomberg Línea, 2022).

Dados históricos evidenciam a evolução dessa rivalidade. Em determinados períodos, a Cielo possuía cerca de 38% do mercado, seguida por Rede (25%) e GetNet (12%), enquanto Stone e PagSeguro apresentavam crescimento expressivo (Concil, 2019). Segundo dados da Associação Brasileira das Empresas de Cartões de Crédito e Serviços (ABECS), citados pela Bloomberg Línea, no segundo trimestre de 2022 a participação aproximada era de 26% para Cielo, 21,4% para Rede e 13,9% para GetNet, indicando redução da liderança da Cielo diante do avanço das fintechs (Bloomberg Línea, 2022).

A rivalidade também se manifesta em movimentos estratégicos agressivos, como a redução de taxas e a antecipação gratuita de recebíveis. Um exemplo foi a decisão da Rede de zerar taxas de antecipação para atrair lojistas (Exame, 2019), enquanto empresas como PagSeguro passaram a oferecer prazos de pagamento mais curtos, intensificando a disputa por clientes (Seu Dinheiro, 2019). De forma geral, a elevada rivalidade no setor impulsiona inovação e redução de custos, mas também dificulta a manutenção de vantagens competitivas duradouras.

### 1.1.2. Análise SWOT (sprint 2)

A matriz SWOT, ou FOFA, é uma abreviação para forças, oportunidades, fraquezas e ameaças. Ela é dividida em fatores internos e externos, sendo forças e fraquezas classificadas como internos, e oportunidades e ameaças como externos. Essa matriz ajuda a apoiar decisões estratégicas e o planejamento, além de organizar e entender alguns fatores da empresa, como quais oportunidades aproveitar, onde precisa melhorar e quais riscos precisa evitar. 



<div align="center">
  <sub>Figura 1.1.2.1 - Análise SWOT</sub><br>
  <img src="/assets/swot.png" width="100%" alt="Descrição breve"><br>
  <sup>Material produzido pelos autores, 2026<sup>
</div>


#### Forças

##### Consolidada no mercado de varejo;


Por estar presente no mercado varejista há 30 anos (CIELO, 2026)  e integrar o cotidiano de inúmeros brasileiros que utilizam seus produtos e serviços, a Cielo consolidou amplo reconhecimento entre os vendedores. Dessa forma, a marca deixou de ser percebida apenas como uma fornecedora de maquininhas de pagamento, passando a ser associada a uma empresa confiável, sólida e segura, que oferece suporte consistente e não desampara seus parceiros comerciais.

##### presença em todas as regiões do país
Ao manter atuação em todas as regiões do território nacional, a Cielo alcança mercados frequentemente pouco assistidos por suas concorrentes, incluindo áreas mais remotas e localidades de menor densidade populacional. Dessa forma, a empresa posiciona-se como pioneira em diversos contextos regionais, consolidando sua presença e conquistando a confiança de vendedores das mais variadas regiões do país.

##### Portfólio diversificado de soluções  
Em razão da necessidade de adaptar-se aos mais diversos perfis de vendedores e às diferentes realidades de mercado, a Cielo desenvolve soluções específicas para atender a cada demanda. Como exemplo, destaca-se a Cielo Tap, voltada a empreendedores que estão ingressando no mercado e que, por esse motivo, podem utilizar o próprio telefone celular como ferramenta para realização de transações, dispensando, inicialmente, o uso de uma maquininha física.


#### Fraquezas


##### Taxas rígidas para os clientes 
A Cielo apresenta menor flexibilidade na negociação de taxas quando comparada a fintechs e adquirentes digitais. (Idinheiro, 2026)Essa rigidez pode reduzir sua competitividade, principalmente entre micro e pequenos empreendedores sensíveis a custos. Em um mercado cada vez mais orientado por preço, taxas menos adaptáveis dificultam a retenção e atração de novos clientes. Como consequência, a empresa pode perder espaço para concorrentes com modelos mais dinâmicos e personalizados.

##### Dependência dos bancos controladores
A estrutura societária da Cielo está fortemente vinculada a grandes instituições financeiras, o que pode limitar sua autonomia estratégica. Decisões corporativas podem ser influenciadas pelos interesses dos bancos controladores, reduzindo agilidade frente às mudanças do mercado. Além disso, essa dependência pode dificultar parcerias com outras instituições financeiras concorrentes (investing, 2024). Em um setor altamente inovador, menor independência pode impactar a capacidade de adaptação.
	

##### Erosão do Market Share
Nos últimos anos, a Cielo tem enfrentado perda gradual de participação de mercado diante da ascensão de novas adquirentes e fintechs (InvestingNews, 2021). Empresas como PagSeguro e Stone adotaram modelos mais agressivos de precificação e atendimento. Esse cenário intensificou a competição e reduziu a vantagem histórica da Cielo no setor. A erosão do market share evidencia desafios na manutenção da liderança em um ambiente de alta rivalidade competitiva.

#### Oportunidades

##### Crescimento do pix e pagamentos instantâneos
Cerca de 165 milhões de pessoas e 14 milhões de empresas utilizam esses sistemas de pagamento de forma regular. De 2023 para 2024, foi observado um aumento de 52% no número de transações por pix (Dock Tech, 2025). Por esse tipo de pagamento estar em um crescimento exponencial, existe uma grande oportunidade da Cielo converter os clientes que usam a chave PIX manual para o PIX via maquininha.

##### Open Finance em avanço no mercado
Entre os anos de 2023 e 2024, foi registrado um aumento de 100% nos consentimentos de Open Finance registrados no Brasil (Exame, 2024). Isso leva a um cenário onde é interessante para a Cielo a ideia de oferecer soluções integradas de pagamento via Open Finance.

##### Mercado de E-commerce em constante crescimento
O e-commerce brasileiro faturou mais de R$ 200 bilhões em 2025, com crescimento superior a 10% (Edrone, 2026).  Isso coloca a Cielo em uma posição em que é vantajoso investir em fazer parte desse mercado, dado seu potencial de lucro.

#### Ameaças

##### Concorrência 
O mercado brasileiro de adquirência passou por uma transformação radical na última década. Três players emergiram como ameaças diretas e consolidadas à liderança histórica da Cielo: o Mercado Pago (BP Money, 2024), a Stone e a Pagbank (Infomoney, 2026). 

##### Novos entrantes substitutos
A maquininha física tradicional enfrenta uma ameaça de substituição por múltiplas tecnologias que não necessitam de hardware. Entre essas temos as principais Tap to Pay e o PIX por QR code, onde as empresas Nubank e Inter chegam em peso utilizando dessas tecnologias (Finsiders, 2023).

##### Aumento do preço dos hardwares
O advento da IA implicou diretamente no aumento do preço das peças tecnológicas no mercado (Inovadesk, 2026), desde processadores e memória RAM, até telas touchscreen e módulos de comunicação . Em consequência disso, as maquininhas eventualmente vão ficar mais caras.

### 1.1.3. Missão / Visão / Valores (sprint 2)

##### Missão:
Por estarem distribuídos pelo país, os gerentes de negócios da Cielo não recebem um treinamento homogêneo. Nossa missão é sanar esse problema por meio de uma plataforma gamificada de treinamento que capacitará igualmente todos os GN’s.


##### Visão:
Ser uma parte fundamental do treinamento dos Gerentes de negócios da Cielo ao resolver o problema da barreira geográfica.

##### Valores: 
Diversidade, responsabilidade social, linguagem simples e acessível, reconhecimento de bom desempenho, ensinar e capacitar.


### 1.1.4. Proposta de Valor (sprint 4)

*Posicione aqui o canvas de proposta de valor. Descreva os aspectos essenciais para a criação de valor da ideia do produto com o objetivo de ajudar a entender melhor a realidade do cliente e entregar uma solução que está alinhado com o que ele espera.*

### 1.1.5. Descrição da Solução Desenvolvida (sprint 4)

A solução consiste em um jogo digital single-player que simula a atuação de um Gerente de Negócios (GN) da Cielo em processos de prospecção e conversão de clientes. A dinâmica é baseada em decisões em turnos, nas quais o jogador seleciona abordagens comerciais diante de diferentes cenários de negociação.

Por meio de gamificação, o sistema transforma práticas reais em experiências interativas de aprendizagem, permitindo o desenvolvimento de competências como argumentação, negociação e tratamento de objeções, com feedback imediato.

A solução incorpora processos reais da operação, como o repique, garantindo aderência ao contexto de atuação e promovendo a padronização de abordagens e o desenvolvimento de performance. Como resultado, atua como uma ferramenta escalável de capacitação, alinhada aos objetivos do parceiro de negócios.

### 1.1.6. Matriz de Riscos (sprint 4)

*Registre na matriz os riscos identificados no projeto, visando avaliar situações que possam representar ameaças e oportunidades, bem como os impactos relevantes sobre o projeto. Apresente os riscos, ressaltando, para cada um, impactos e probabilidades com plano de ação e respostas.*

### 1.1.7. Objetivos, Metas e Indicadores (sprint 4)

# 📊 Matriz de Metas SMART — MVP (Sprints 4 e 5)

| Objetivo | S (Específica) | M (Mensurável) | A (Atingível) | R (Relevante) | T (Temporal) | KPI (Indicador de Sucesso) |
|----------|---------------|---------------|---------------|---------------|---------------|----------------------------|
| Desenvolvimento Técnico (Mundo) | Implementar colisões e transições completas para os 4 estabelecimentos restantes (Salão, Materiais de Construção, Posto e Supermercado) no mapa principal | 100% dos estabelecimentos acessíveis com colisão funcional e transição fluida (sem travamentos) | Base já existente (Padaria/Loja) pode ser replicada e adaptada por meio de uma classe comum aos estabelecimentos | Essencial para completar o loop de exploração do jogo | Até o final da Sprint 4 | Taxa de acesso bem-sucedido ≥ 95% nos testes internos |
| Qualidade Pedagógica (Combate) | Desenvolver banco de diálogos cobrindo objeções reais dos produtos Cielo (Flash, LIO, Smart, Vendeu Tá na Conta) com feedback imediato ao jogador | Mínimo de 5 objeções por estabelecimento implementadas com respostas e impacto na satisfação | Conteúdo estruturado em árvore de decisão reutilizável | Garante o valor educacional do jogo para treinamento de GNs | Até o final da Sprint 4 | ≥ 80% de respostas corretas aumentando satisfação nos testes |
| Confiabilidade (QA) | Adicionar pelo menos mais 15 casos de teste | 100% dos testes passando sem erros ou warnings críticos | Escopo já parcialmente implementado e testável | Evita falhas críticas no MVP e aumenta a credibilidade | Até o final da Sprint 5 | 0 erros no console + 100% dos CTs aprovados |
| Experiência do Usuário (UX/UI) | Adicionar efeitos sonoros e trilhas sonoras as cenas e aos combates | 90 % das interações com efeito sonoro ou música | Ajustes incrementais com base no sistema atual | Impacta diretamente o engajamento e imersão | Iterativo até o final da Sprint 5 | 100 % dos estabelecimentos com trilha sonora, mas sem áudios interativos |


## 1.2. Requisitos do Projeto (sprints 1 e 2)

Nesta seção, iremos apresentar os requisitos funcionais e não funcionais que fazem parte da estruturação do jogo "Mestre de vendas". Requisitos funcionais referem-se aos comportamentos que o sistema deve executar para garantir suporte às necessidades do usuário, como por exemplo, a possibilidade de movimentação do personagem com o uso de teclas específicas. Por outro lado, os requisitos não funcionais descrevem como o sistema deve agir para efetivamente funcionar e oferecer uma boa experiência ao usuário. Por exemplo: O sistema deve funcionar em navegadores.

\# | Requisitos funcionais  
--- | ---
RF01 | O jogo deve ter uma tela inicial.
RF02 | A tela inicial deve conter um botão de jogar.
RF03 | Ao clicar no botão de jogar, o usuário deve ser direcionado para a tela de escolha do personagem jogável.
RF04 | O jogo deve fornecer mais de um personagem jogável.
RF05 | O jogador deve escolher seu personagem jogável dentro das opções disponíveis.
RF06 | O jogo deve ter um botão continuar na tela de escolha.
RF07 | Ao clicar no botão continuar o jogador deve ser direcionado à tela de tutorial.
RF08 | O jogo deve possuir um tutorial interativo.
RF09 | O jogador deve interagir com o tutorial para avançar.
RF10 | O tutorial deve apresentar informações sobre a empresa.
RF11 | O tutorial deve apresentar informações sobre os produtos.
RF12 | O jogo deve fornecer um sistema para o controle da movimentação do personagem principal para o jogador.
RF13 | O jogo deve ser mundo aberto.
RF14 | O jogo deve possuir múltiplos estabelecimentos no mapa.
RF15 | O jogador deve poder entrar nos estabelecimentos.
RF16 | O jogo deve possuir sistema de captura em turnos.
RF17 | O jogador deve escolher entre diferentes opções durante o turno.
RF18 | Cada captura deve simular uma situação real com clientes.
RF19 | Os personagens dos estabelecimentos devem possuir um sistema de satisfação.
RF20 | O turno deve possuir sistema de reputação do vendedor.
RF21 | Os sistemas de satisfação e reputação devem diminuir a cada resposta errada.
RF22 | Os sistemas de satisfação e reputação devem aumentar a cada resposta correta.
RF23 | Cada turno é vencido quando o nível de satisfação atingir o máximo.
RF24 | Cada turno é perdido quando o nível de satisfação atingir o mínimo.
RF25 | O jogo deve aumentar a dificuldade a cada cena vencida pelo jogador.
RF26 | O jogo deve dar dicas e revisões conforme o progresso do jogo.

\# | Requisitos não funcionais
--- | ---
RNF01 | O jogo deve apresentar interface intuitiva e de fácil compreensão.
RNF02 | O jogo deve possuir acessibilidade básica (legendas, contraste adequado e textos legíveis).
RNF03 | O jogo deve apresentar compatibilidade com teclado e mouse.
RNF04 | O código do sistema deve seguir boas práticas de organização e modularização.
RNF05 | O jogo deve ser visualmente confortável.



## 1.3. Público-alvo do Projeto (sprint 2)

Foi definido no workshop promovido pela Cielo e proposto aos grupos que o público-alvo do jogo Mestre de Vendas é composto pelos Gerentes de Negócios (GNs) da Cielo, profissionais responsáveis pela atuação comercial porta a porta na venda das maquininhas e soluções de pagamento da empresa. Esses colaboradores têm como principal atribuição apresentar os benefícios dos produtos, negociar condições comerciais e captar novos clientes.
Dado que a Cielo é uma empresa que atua no âmbito nacional, é natural que os Gerentes de Negócios não estejam concentrados em uma única região do país. Como o objetivo do jogo é proporcionar um treinamento padronizado entre todos os colaboradores, não devem ser feitas distinções entre regiões, buscando nesse âmbito um perfil mais geral.
Além disso, o treinamento deve ser direcionado especialmente para a capacitação dos GNs na abordagem de estabelecimentos com faturamento igual ou superior a  R$ 15.000,00 mensais. Esse recorte é relevante por representar um segmento significativo dentro da estratégia de expansão comercial da empresa, exigindo argumentação adequada, domínio técnico das soluções ofertadas e capacidade de negociação.


# <a name="c2"></a>2. Visão Geral do Jogo (sprint 2)

## 2.1. Objetivos do Jogo (sprint 2)

O objetivo do jogo é atingir a meta de captação de potenciais clientes da Cielo. No contexto da narrativa, o jogador assumirá o papel de Gerente de Negócios (GN), profissional responsável pela prospecção e negociação porta a porta junto a estabelecimentos comerciais.
A missão consiste em visitar diferentes tipos de empreendimentos, como padarias, postos de gasolina, restaurantes, entre outros, com o objetivo de apresentar os benefícios das soluções de pagamento oferecidas pela empresa e persuadir os proprietários ou responsáveis comerciais a adotarem a maquininha da Cielo. Cada estabelecimento será um desafio para o jogador.
Durante as interações, os personagens que representam os comerciantes apresentarão objeções comuns ao processo de venda, tais como a alegação de que concorrentes oferecem taxas mais baixas ou a preferência por marcas já conhecidas e consolidadas. Nesse cenário, caberá ao jogador analisar cada situação e selecionar os argumentos mais adequados para contornar as objeções apresentadas, demonstrando conhecimento técnico, capacidade de negociação e domínio das vantagens competitivas da empresa.
O objetivo final é ampliar a base de clientes da Cielo dentro do ambiente do jogo,  deixando o mundo azul. 


## 2.2. Características do Jogo (sprint 2)

### 2.2.1. Gênero do Jogo (sprint 2)

O jogo configura-se como um RPG de turno, no qual o jogador assume o papel de um personagem, toma decisões estratégicas e enfrenta desafios em rodadas organizadas, evoluindo ao longo da narrativa. Nesse contexto, o jogador representa um gerente de negócios (GN) da Cielo. O participante terá como objetivo captar novos clientes para a empresa a cada conjunto de turnos, sendo cada conjunto simbolizado por um estabelecimento comercial distinto. A cada rodada, o jogador deverá tomar decisões estratégicas que impactarão seu desempenho, simulando desafios reais do mercado competitivo. 

### 2.2.2. Plataforma do Jogo (sprint 2)

Nosso jogo poderá ser acessado em qualquer dispositivo com navegador web, seja ele no telefone, no computador, notebook entre outros.

### 2.2.3. Número de jogadores (sprint 2)


O jogo será desenvolvido para ser jogado por um único jogador, já que seu objetivo é ser um treinamento para os GNs, não necessitando de uma funcionalidade multiplayer para ser cumprido.


### 2.2.4. Títulos semelhantes e inspirações (sprint 2)

A principal inspiração visual e de navegação para o projeto é a franquia clássica Pokémon (em suas versões 2D de GBA/SNES). O jogo apropria-se da perspectiva top-down (visão superior), permitindo que o avatar do jogador caminhe livremente pelas ruas de uma cidade e faça a transição para dentro dos prédios comerciais. A dinâmica de "batalhas" do Pokémon serve como inspiração indireta para as interações de vendas: ao abordar um lojista, o GN entra em uma interface de diálogo onde precisa escolher as "técnicas" ou "argumentos" corretos (como se fossem os ataques ou itens) para convencer o cliente a fechar o credenciamento com a Cielo.

### 2.2.5. Tempo estimado de jogo (sprint 5)

*Ex. O jogo pode ser concluído em 3 horas passando por todas as fases.*

*Ex. cada partida dura até 15 minutos*

# <a name="c3"></a>3. Game Design (sprints 2 e 3)

## 3.1. Enredo do Jogo (sprints 2 e 3)

O enredo acompanha o primeiro dia de trabalho de uma pessoa recém-contratada para o cargo de Gerente de Negócios (GN) da Cielo. A narrativa inicia-se no Espaço Cielo, onde a personagem protagonista é recebida para o processo de onboarding. Nessa etapa inicial de contextualização, equivalente ao tutorial, a pessoa jogadora participa de um treinamento introdutório voltado à compreensão do portfólio de produtos da empresa, incluindo maquininhas de pagamento, taxas e benefícios oferecidos, além das principais técnicas de abordagem em vendas.


O conflito narrativo estabelece-se quando a pessoa GN é direcionada ao trabalho de campo, caracterizado pela estratégia de prospecção “porta a porta”, com o objetivo de cumprir uma meta desafiadora de credenciamentos. O jogo tem início com a visita da pessoa GN a uma padaria, na qual deve persuadir a pessoa proprietária a tornar-se cliente da Cielo. Em seguida, a pessoa jogadora deve prosseguir para o próximo estabelecimento da lista.


Entre as possibilidades de interação, pode ocorrer a situação denominada repique, na qual a pessoa GN retorna a um estabelecimento já visitado para acompanhar a pessoa cliente e fortalecer o relacionamento comercial com a empresa. Cada estabelecimento visitado apresenta um novo aprendizado ou introduz uma nova terminologia relacionada às práticas comerciais da organização.


Nesses momentos de aprendizado, a pessoa GN retorna ao Espaço Cielo para realizar etapas adicionais de capacitação. Após concluir o aprimoramento necessário, a personagem retorna ao campo para dar continuidade às próximas etapas do jogo. O progresso da narrativa ocorre à medida que os estabelecimentos da lista tornam-se clientes da Cielo. Ao final desse processo, quando todos os credenciamentos são realizados, o jogo é concluído e a pessoa GN finaliza o treinamento proposto.



## 3.2. Personagens (sprints 2 e 3)

### 3.2.1. Controláveis

O jogo possui quatro personagens controláveis, sendo dois homens e duas mulheres, que podem ser escolhidos no início da partida. Os homens são João (um homem negro) e José (um homem branco), e as mulheres são Maria (uma mulher parda) e Paula (uma mulher branca). Esses personagens representam os Gerentes de Negócios da Cielo e têm como objetivo conquistar determinados vendedores e transformá-los em clientes da empresa. Eles não possuem habilidades específicas, ou seja, a escolha do personagem não altera a experiência do usuário.

<div align="center">
  <sub>Figura 3.2.1.1 - Sprite do João</sub><br>
  <img src="/assets/joao.png" width="100%" alt="Sprite João"><br>
  <sup>Fonte: <a href="http://limezu.itch.io/" target="_blank">LimeZu</a>, 2025 e editado pelos autores, 2026.</sup>
</div>

<div align="center">
  <sub>Figura 3.2.1.2 - Sprite do João dentro do comércio</sub><br>
  <img src="/assets/joaoCorpo.png" width="50%" alt="Sprite João"><br>
  <sup>Fonte: Material produzido pelos autores, 2026.</sup>
</div>


<div align="center">
  <sub>Figura 3.2.1.3 - Sprite do José</sub><br>
  <img src="/assets/jose.png" width="100%" alt="Sprite José"><br>
  <sup>Fonte: <a href="http://limezu.itch.io/" target="_blank">LimeZu</a>, 2025 e editado pelos autores, 2026.</sup>
</div>

<div align="center">
  <sub>Figura 3.2.1.4 - Sprite do José dentro do comércio</sub><br>
  <img src="/assets/joseCorpo.png" width="50%" alt="Sprite José"><br>
  <sup>Fonte: Material produzido pelos autores, 2026.</sup>
</div>


<div align="center">
  <sub>Figura 3.2.1.5 - Sprite da Maria</sub><br>
  <img src="/assets/mariaGdd.png" width="100%" alt="Sprite Maria"><br>
  <sup>Fonte: <a href="http://limezu.itch.io/" target="_blank">LimeZu</a>, 2025 e editado pelos autores, 2026.</sup>
</div>

<div align="center">
  <sub>Figura 3.2.1.6 - Sprite da Maria dentro do comércio</sub><br>
  <img src="/assets/mariaCorpo.png" width="50%" alt="Sprite Maria"><br>
  <sup>Fonte: Material produzido pelos autores, 2026.</sup>
</div>


<div align="center">
  <sub>Figura 3.2.1.7 - Sprite da Paula</sub><br>
  <img src="/assets/paulaGdd.png" width="100%" alt="Sprite Paula"><br>
  <sup>Fonte: <a href="http://limezu.itch.io/" target="_blank">LimeZu</a>, 2025 e editado pelos autores, 2026.</sup>
</div>

<div align="center">
  <sub>Figura 3.2.1.8 - Sprite da Paula dentro do comércio</sub><br>
  <img src="/assets/paulaCorpo.png" width="50%" alt="Sprite Paula"><br>
  <sup>Fonte: Material produzido pelos autores, 2026.</sup>
</div>

### 3.2.2. Non-Playable Characters (NPC)

O jogo conta com os chamados Non-Playable Characters, que são, de forma literal, personagens não-jogáveis. Esse conjunto de personagens são responsáveis por duas partes do jogo: as capturas por turno e o apoio ao jogador. Nas capturas, temos quatro personagens que representam os donos de quatro estabelecimentos: Tião, o dono de uma padaria;  Pedro, o dono de uma loja de roupas; Márcia, a dona de farmácia e Leila, a dona de um salão de beleza. Na ajuda ao jogador, temos o Mestre de Vendas, um personagem que representa o estadual responsável. Ele é quem realiza a dinâmica do tutorial inicial no jogo, passando as principais informações técnicas e orientações de jogabilidade ao usuário.
O processo de criação dos NPCs ocorreu em duas etapas principais: primeiro, o desenho feito à mão, detalhando características específicas alinhadas aos valores da equipe; em seguida, o aprimoramento com o apoio de ferramentas de inteligência artificial, a fim de garantir melhor visualização e refinamento dos personagens.
Para a próxima sprint, o objetivo é realizar o desenho manual das sprites desses personagens, que serão utilizadas no desenvolvimento das animações e farão parte da dinâmica do jogo.

<div align="center">
  <sub>Figura 3.2.2.1 - Esboço e digitalização do Tião, o dono da padaria.</sub><br>
  <img src="/assets/padeiro.jpg" width="100%" alt="Esboço Tião"><br>
  <sup>Fonte: Material produzido pelos autores, 2026.</sup>
</div>

<div align="center">
  <sub>Figura 3.2.2.2 - Sprite do padeiro feita a mão</sub><br>
  <img src="/assets/spritePadeiro.png" width="100%" alt="Esboço Dona do salão de beleza"><br>
  <sup>Fonte: Material produzido pelos autores, 2026.</sup>
</div>

###

<div align="center">
  <sub>Figura 3.2.2.3 - Esboço e digitalização do Pedro, o dono da loja de roupas.</sub><br>
  <img src="/assets/homem.jpg" width="100%" alt="Esboço Dono da loja de roupa"><br>
  <sup>Fonte: Material produzido pelos autores, 2026.</sup>
</div>

###

<div align="center">
  <sub>Figura 3.2.2.4 - Esboço e digitalização da Márcia, a dona de farmácia.</sub><br>
  <img src="/assets/mulher.jpg" width="100%" alt="Esboço Dona da ???"><br>
  <sup>Fonte: Material produzido pelos autores, 2026.</sup>
</div>

###

<div align="center">
  <sub>Figura 3.2.2.5 - Esboço e digitalização da Leila, a dona de salão de beleza.</sub><br>
  <img src="/assets/cabeleleira.jpg" width="100%" alt="Esboço Dona do salão de beleza"><br>
  <sup>Fonte: Material produzido pelos autores, 2026.</sup>
</div>

#####

<div align="center">
  <sub>Figura 3.2.2.6 - Sprite da Leila feita a mão</sub><br>
  <img src="/assets/spriteLeila.png" width="100%" alt="Esboço Dona do salão de beleza"><br>
  <sup>Fonte: Material produzido pelos autores, 2026.</sup>
</div>

###

<div align="center">
  <sub>Figura 3.2.2.7 - Sprite do estadual (Mestre de vendas da Cielo)</sub><br>
  <img src="/assets/spriteEstadual.png" width="70%" alt="Esboço Dona do salão de beleza"><br>
  <sup>Fonte: Material produzido pelos autores, 2026.</sup>
</div>

### 3.2.3. Diversidade e Representatividade dos Personagens

Tendo em vista o fato de a Cielo ser uma empresa nacional, presente em diversas regiões de um país com território de dimensões continentais e marcado por ampla diversidade cultural, social e étnica, torna-se fundamental que o jogo esteja alinhado aos valores institucionais da organização. Nesse contexto, a promoção da inclusão e da representatividade não se configura apenas como uma escolha estética ou narrativa, mas como um posicionamento coerente com a identidade e a atuação da empresa no mercado brasileiro.

Os personagens foram desenvolvidos com foco na representatividade e na inclusão. Por essa razão, optou-se pela criação de quatro personagens jogáveis, sendo duas mulheres e dois homens. Entre eles, há uma mulher e um homem negros, bem como uma mulher e um homem brancos, buscando contemplar diferentes perfis e promover maior diversidade dentro do jogo. Essa escolha impacta diretamente a experiência dos jogadores, pois amplia as possibilidades de identificação e pertencimento, permitindo que diferentes públicos se vejam representados na narrativa. Ao reconhecer traços de sua própria realidade nos personagens, o jogador tende a estabelecer maior conexão emocional com o jogo, fortalecendo o engajamento e a sensação de valorização.

Além disso, o desenvolvimento de NPCs que também refletiram essa proposta inclusiva, ampliando a pluralidade de identidades, origens e vivências presentes na narrativa. A equipe permanece aberta à incorporação de novos personagens diversos, de modo a fortalecer continuamente o compromisso com a representatividade e assegurar que o jogo dialogue de forma sensível e respeitosa com a realidade multicultural do Brasil. 

Dessa forma, a inclusão deixa de ser apenas um elemento conceitual e passa a constituir um fator estruturante da experiência do usuário, contribuindo para a construção de um ambiente virtual mais equitativo, acolhedor e alinhado aos valores institucionais da empresa. 


## 3.3. Mundo do jogo (sprints 2 e 3)

### 3.3.1. Locações Principais e/ou Mapas (sprints 2 e 3)

| Local                         | Descrição Narrativa                                                                 | Função no Jogo                                                                 |
|--------------------------------|--------------------------------------------------------------------------------------|---------------------------------------------------------------------------------|
| Agência Cielo (Centro)        | O "QG" do jogador. Prédio corporativo localizado estrategicamente no centro do mapa. | Ponto de partida (Hub), local de nascimento do sprite (personagem) e área de tutoriais. |
| Padaria | Estabelecimento menor realiza cerca de 30 mil reais em transações | Local da primeira missão e batalha de venda introdutória com objeções mais simples, nível de dificuldade fácil. |
| Loja de vestuário | Estabelecimento menor realiza cerca de 15 mil reais em transações | Local da segunda missão e batalha de venda que ainda se mantém no nível fácil, mas que ainda tem uma dificuldade levemente maior que a padaria. |
| Salão beleza       | Comércio focado em serviços voltados para o bem estar que faz cerca de 20 mil reias em transações por mês| Fase com nível de dificuldade intermediário, exigindo argumentos diferentes focados em parcelamento e taxas. |
| Loja de materiais de construção | Comércio focado em produtos comprados em grande quantidade que faz cerca de 80 mil reias em transações mensais| Fase com nível de dificuldade intermediário um pouco mais elevado que o salão, exigindo argumentos diferentes e mais elaborados. |
| Supermercado e Posto de gasolina     | Grandes estabelecimentos localizados nas extremidades do mapa, atendem centenas de clientes todos os dias realizando cerca de 300 á 750 mil reais em transações por mês                     | Clientes de alta complexidade ("Chefões"), exigindo alto domínio do portfólio da Cielo e das técnicas de venda





### 3.3.2. Navegação pelo mundo (sprints 2 e 3)

A navegação do personagem ocorre de maneira livre pelo mapa 2D, utilizando uma visão top-down clássica de jogos de RPG.

Controles de Movimento: O jogador utiliza as teclas UP, DOWN, LEFT e RIGHT para caminhar pelas ruas e interagir com o ambiente.

Transições de Tela: Ao encostar na porta de um comércio (ex: Padaria, Farmácia), o jogador é teleportado para o interior da loja.

Interação (Batalha): Ao se aproximar do balcão e interagir com o NPC (lojista) através de uma tecla de ação (ex: barra de espaço ou 'E'), o jogo transita da tela de exploração para a interface de "Batalha de Vendas", onde o jogador escolhe seus argumentos em um menu de escolhas.

### 3.3.3. Condições climáticas e temporais (sprints 2 e 3)

*Não se aplica.*

### 3.3.4. Concept Art (sprint 2)

Abaixo estão os estudos iniciais de level design e a identidade visual do jogo em pixel art.

<div align="center">
  <sub>Figura 3.3.4.1 - Estudo de interface visual e estilo de arte (Pixel Art)</sub><br>
  <img src="/assets/cidade_tileset.png" width="100%" alt="Sprite João"><br>
  <sup>Fonte: Material produzido pelos autores, 2026.</sup>
</div>

A imagem ilustra a visão top-down, o sprite do personagem principal (Gerente de Negócios) e a fachada de estabelecimentos comuns (Padaria e Farmácia).

Os objetos do Tiled Map foram projetados por [LimeZu](http://limezu.itch.io/).

 ###

<div align="center">
  <sub>Figura 3.3.4.2 - Esboço preliminar (Side-scroller) ilustrando a escala dos edifícios.</sub><br>
  <img src="/assets/concept1.png" width="100%" alt="Sprite João"><br>
  <sup>Fonte: Material produzido pelos autores, 2026.</sup>
</div>

Destaque para o escritório da Cielo como ponto de partida (nascimento do sprite) e os estabelecimentos vizinhos que servirão como as primeiras missões.
 ###

<div align="center">
  <sub>Figura 3.3.4.3 - Esboço do Mapa Geral (Top-down)</sub><br>
  <img src="/assets/concept2.png" width="100%" alt="Sprite João"><br>
  <sup>Fonte: Material produzido pelos autores, 2026.</sup>
</div>

Demonstra a centralidade do prédio da Cielo no level design, facilitando o acesso radial aos diferentes perfis de clientes ao redor (Shopping Center, Hotel, Salão, Farmácia e Padaria).

 

### 3.3.5. Trilha sonora (sprint 4)

No mundo dos jogos, a trilha sonora é um recurso de suma importância para a experiência do usuário, sendo utilizada para fornecer feedbacks sonoros (sons para vitória ou derrota) para as ações dos jogadores, como também para deixar a experiência mais imersiva. Além disso, os recursos sonoros de um jogo reduzem a carga cognitiva, já que auxiliam o jogador a entender o ambiente e a integrar-se a ele. 

\# | titulo | ocorrência | autoria | fonte | Duração
--- | --- | --- | --- | --- | ---
1 | Tema de abertura | tela de início e tela de escolha dos personagens | XTREMEFREDDY | (XTREMEFREDDY, 2023) | 1 minuto e 15 segundos.
2 | Tema do Espaço Cielo | tela do Espaço Cielo | Dean Raul DiArchangeli | (DIARCHANGELI, 2012) | 2 minutos e 33 segundos.
3 | Tema do mapa da Cidade | tela do mapa da Cidade | Lindsey Sewell | (SEWELL, 2021) | 2 minutos e 38 segundos.
4 | Tema das cenas de combate | telas de combate (parte interna dos estabelecimentos) | Alexandr Zhelanov | (ZHELANOV, 2014) | 1 minuto e 44 segundos.

## 3.4. Inventário e Bestiário (sprint 3)

*Não se aplica.*

## 3.5. Gameflow (Diagrama de cenas) (sprint 2)

O diagrama de cenas (gameflow) é uma ferramenta essencial no desenvolvimento de jogos. Ele dita a lógica de transição e o ciclo de vida entre diferentes cenas do jogo, assim a equipe de desenvolvimento dos jogos consegue visualisar e seguir a mesma lógica. A implementação dos diagramas UML, servem para indicar as classes do jogo (cenas), os atributos, que são todas as características que cada cena deve ter e os métodos, as ações que cada cena deve fazer.
<div align="center">
  <sub>Figura 3.5.1 - Diagrama de cenas</sub><br>
  <img src="/assets/DiagramaOficial.png" width="100%" alt="Sprite João"><br>
  <sup>Fonte: Material produzido pelos autores, 2026.</sup>
</div>

### 

## 3.6. Regras do jogo (sprint 3)
As regras de um jogo possuem um propósito fundamental: o estabelecimento de um desafio. Quando se traçam objetivos claros, as regras atuam como uma das principais formas de motivação e engajamento para o jogador. Tais restrições são consideradas produtivas; ao definir parâmetros para a conclusão do desafio, o sistema força o jogador a desenvolver a criatividade para superar obstáculos. Pode-se concluir que as regras não servem para impedir o jogador ou proibi-lo de algo, mas sim para dar significado e emoção quando ele alcança a vitória através da superação.

\# | Regras
-|----
1| A cada rodada, o jogador precisa convencer um comerciante a tornar-se um cliente Cielo.
2| O jogador precisa manter o humor do comerciante acima de 60% para ganhar a fase.
3| O jogador precisa acertar três perguntas para conquistar o cliente.
4| Caso o jogador erre duas ou mais questões, ele perde o cliente.
5| Caso o jogador esgote o banco de questões sem conquistar o cliente, ele é "mandado embora".
6| O jogador precisa convencer todos os comerciantes da cidade a se tornarem clientes Cielo.
7| O jogador deve responder conforme o padrão ensinado no onboarding da Cielo.


## 3.7. Mecânicas do jogo (sprint 3)
As mecânicas de um jogo definem as ações, os limites e as interações, transformando o usuário em um agente ativo da narrativa. Ao estabelecê-las, cria-se a tensão que mantém o jogador engajado, dando peso às suas escolhas e conferindo um sentido de propósito à sua jornada.

\# | Mecânicas                      
-|----------------------------
1| A escolha de um dos quatro personagens jogáveis é feita ao clicar com o mouse sobre o ícone do GN escolhido na tela de seleção.
2| O tutorial do Estadual possui uma sequência de 8 caixas de texto sobre produtos e serviços Cielo, que progridem conforme o jogador clica no botão "continuar".
3| No tutorial do Estadual, o jogador pode regredir na sequência de textos clicando no botão "voltar".
4| Os movimentos do jogador no mapa e no Espaço Cielo são determinados pelas teclas de seta do teclado (left, right, up, down).
5| O jogador entra em cada fase quando a sprite colide com a representação de um dos comércios no mapa.
6| Dentro da fase, o jogador permanece na visão de terceira pessoa ou visão lateral.
7| Durante as fases, o jogador utiliza o botão esquerdo do mouse para clicar em uma das duas opções de diálogo.
8| Uma variável numérica rastreia o nível de satisfação dos comerciantes em cada fase.
9| O valor da variável é alterado de acordo com as opções de diálogo escolhidas pelo jogador (+33,3% em caso de acerto e -33,3% em caso de erro).
10| O encerramento de cada fase em vitória ocorre quando a variável de satisfação atinge o valor igual a 100%. 
11| O encerramento de cada fase em derrota ocorre quando a variável de satisfação atinge o valor igual a 0%.
12| O encerramento de cada fase com a mensagem "O cliente te mandou embora" ocorre quando o jogador esgota todas as questões disponíveis.
13| As sprites dos NPCs alteram-se de acordo com o nível de satisfação: "Neutro" (34%), "Feliz" (acima de 34%) e "Bravo" (abaixo de 34%).
14| As alternativas de resposta são posicionadas de forma aleatória nas duas caixas de respostas.

## 3.8. Implementação Matemática de Animação/Movimento (sprint 4)

*Descreva aqui a função que implementa a movimentação/animação de personagens ou elementos gráficos no seu jogo. Sua função deve se basear em alguma formulação matemática (e.g. fórmula de aceleração). A explicação do funcionamento desta função deve conter notação matemática formal de fórmulas/equações. Se necessário, crie subseções para sua descrição.*

# <a name="c4"></a>4. Desenvolvimento do Jogo

## 4.1. Desenvolvimento preliminar do jogo (sprint 1)

4.1. Desenvolvimento da Primeira Versão (Sprint 1)
O desenvolvimento desta primeira versão teve como objetivo principal estabelecer a estrutura fundamental do jogo, conectando a interface de usuário inicial com o ambiente de gameplay, em conformidade com os requisitos levantados na Seção 1.2. O foco foi entregar uma navegação funcional e a ambientação visual do projeto.

Implementação da Tela Inicial

Como primeiro requisito funcional, foi identificada a necessidade de uma tela de "Menu Principal". A tela inicial foi construída utilizando uma paleta de cores em tons de azul e um fundo em pixel art representando o céu, elementos que remetem diretamente à identidade visual da Cielo.

Na parte superior, foi inserido o título "Cielo: Mestre de Vendas" e, na inferior, o botão "Jogar". Em termos de codificação com o framework Phaser, este botão foi definido como um elemento interativo através do método setInteractive. Para garantir feedback visual ao usuário, foram programados eventos de pointerover e pointerout que alteram a escala do botão (setScale), criando um efeito dinâmico ao passar o mouse. O clique no botão dispara o evento scene.start, responsável pela transição para a cena do jogo.


<div align="center">
  <sub>Figura 4.1.1 - tela inicial do jogo</sub><br>
  <img src="/assets/image-1.png" width="100%" alt="Sprite João"><br>
  <sup>Fonte: Material produzido pelos autores, 2026.</sup>
</div>


Implementação do Cenário (Escritório)

Após a interação com o menu, o jogador é transportado para a cena principal: o Escritório. Nesta etapa, foi entregue a renderização do mapa de tiles (Tilemap) e o posicionamento do personagem principal. A lógica de movimentação básica foi implementada, permitindo que o jogador explore o ambiente, o que valida a base técnica para as futuras mecânicas de venda.


Dificuldades Encontradas

Durante esta etapa, a principal dificuldade técnica foi o gerenciamento de escalas dos assets em pixel art. Garantir que as imagens não ficassem borradas ao serem redimensionadas exigiu a configuração correta da propriedade pixelArt: true nas configurações do Phaser e ajustes manuais nas dimensões da câmera. Além disso, a sincronização da transição de cenas exigiu várias reviews do código para garantir que os assets da próxima cena fossem carregados corretamente.

Próximos Passos

Implementação da Mecânica de Vendas: Adicionar NPCs (clientes) e criar o sistema de interação/diálogo.
HUD e Pontuação: Criar a interface que mostra o saldo e metas de vendas na tela.
Colisões: Refinar as áreas de colisão do escritório para impedir que o personagem atravesse paredes ou móveis utilizando o sistema de física Arcade do Phaser.

<div align="center">
  <sub>Figura 4.1.2 - concept art do escritório Cielo</sub><br>
  <img src="/assets/image-2.png" width="100%" alt="Sprite João"><br>
  <sup>Fonte: Material produzido pelos autores, 2026.</sup>
</div>

## 4.2. Desenvolvimento básico do jogo (sprint 2)

4.2. Desenvolvimento da Versão Básica (Sprint 2)
O desenvolvimento da versão básica do jogo nesta segunda sprint teve como foco a materialização do ambiente de jogo e a implementação do sistema de física. O objetivo principal foi entregar a renderização do mapa, a integração da sprite do personagem principal e o funcionamento adequado das colisões.

Implementação do Mapa e Delimitação de Escopo O cenário do jogo foi construído utilizando a ferramenta externa Tiled Map Editor. O ambiente foi desenhado através de tilesets e dividido em camadas lógicas (piso, paredes e obstáculos). Para garantir a qualidade da entrega dentro do prazo estipulado, a equipe realizou uma delimitação de escopo, priorizando a construção e o polimento de três áreas principais: o Escritório da Cielo e dois estabelecimentos comerciais (uma Padaria e uma Loja de Roupas).

No código, o sistema de física Arcade do framework Phaser foi ativado para habilitar as colisões mecânicas. As propriedades de colisão foram mapeadas nas camadas de obstáculos do mapa gerado no Tiled, garantindo que o personagem principal interaja corretamente com os limites físicos dos ambientes (como paredes e balcões), solidificando as bases da exploração espacial.

<div align="center">
  <sub>Figura 3.3.4.1 - parte do concept do mapa do jogo</sub><br>
  <img src="/assets/cidade2.png" width="100%" alt="Sprite João"><br>
  <sup>Fonte: Material produzido pelos autores, 2026.</sup>
</div>

### 

Dificuldades Encontradas O maior desafio técnico enfrentado pela equipe esteve diretamente ligado à curva de aprendizado do Tiled e sua integração com o motor do jogo. O processo de criação do mapa demandou estudo desde os conceitos iniciais da ferramenta até a descoberta das bibliotecas corretas.

A alta complexidade em manipular múltiplas ferramentas de design e programação simultaneamente motivou a decisão de reduzir o escopo geográfico do jogo nesta sprint. Além disso, a transição entre o mapa exportado e a sua renderização tornou-se um grande obstáculo. Compreender como a arquitetura de dados era alocada no arquivo JSON gerado pelo Tiled e conectar essas referências internas com os assets de imagem carregados no código exigiu muitas revisões para que o cenário fosse reproduzido fielmente e sem falhas de textura.

<div align="center">
  <sub>Figura 3.3.4.1 - parte do concept do mapa do jogo</sub><br>
  <img src="/assets/cidade3.png" width="100%" alt="Sprite João"><br>
  <sup>Fonte: Material produzido pelos autores, 2026.</sup>
</div>

Próximos Passos (Sprint 3)
Expansão e Detalhamento do Cenário: Adicionar novos detalhes visuais aos estabelecimentos atuais e planejar a expansão do mapa para incluir novos comércios.
Inserção de NPCs: Adicionar os sprites dos clientes e lojistas nos respectivos cenários (escritório, padaria e loja de roupas).
Mecânicas de Interação: Implementar áreas de sobreposição (overlaps) para que o personagem consiga interagir com os NPCs e iniciar o fluxo de vendas ou diálogo.

## 4.3. Desenvolvimento intermediário do jogo (sprint 3)

O desenvolvimento da versão intermediária do jogo nesta terceira sprint teve como foco a expansão das cenas jogáveis e a implementação das primeiras mecânicas centrais da experiência. As entregas abrangeram quatro frentes principais: a cena de seleção e apresentação de personagens, o desenvolvimento do Espaço Cielo no Tilied Map e o sistema de tutorial integrado ao mapa e o protótipo funcional do sistema de combate por perguntas e respostas.

### Seleção e Informações de Personagens — personagens.js

Nesta sprint foi implementada a cena de seleção de personagens, permitindo que o GN escolha com qual avatar deseja jogar. A cena exibe os quatro personagens disponíveis — José, Paula, Maria e João — de forma interativa na tela. O código utiliza um array `let personagens = ['JOSÉ', 'PAULA', 'MARIA', 'JOÃO']` para armazenar os nomes jogáveis, e cada sprite é adicionado com `this.add.image(x, y, key).setScale(escala)` e tornado clicável via `character.setInteractive({ cursor: 'pointer' })`. Ao clicar em um personagem, o jogo navega para a cena de informações por meio de `this.scene.start('CharacterInfoScene', { character: key })`, passando o nome do personagem selecionado como parâmetro.

<div align="center">
  <sub>Figura 4.3.1 - Tela de seleção de personagens</sub><br>
  <img src="/assets/selecao_personagens.png" width="100%" alt="Tela de seleção de personagens"><br>

  <sup>Fonte: Material produzido pelos autores, 2026.</sup>
</div>

A cena seguinte exibe as características e a ficha do personagem escolhido. Para isso, o sistema recupera o personagem via `this.characterEscolhido = data.character` e carrega dinamicamente a imagem de informações correspondente com `const infoKey = 'info' + data.character`, o que permite que uma única lógica sirva para todos os personagens. A tela conta com botões de "Voltar" e "Jogar", que redirecionam o jogador de volta à seleção ou para o início da partida.

<div align="center">
  <sub>Figura 4.3.2 - Tela de informações de um dos personagens</sub><br>
  <img src="/assets/info_personagem.png" width="100%" alt="Tela de informações do personagem"><br>
  
  <sup>Fonte: Material produzido pelos autores, 2026.</sup>
</div>

### Cena do Escritório — main.js

A cena principal do Espaço Cielo foi construída com o editor de mapas Tiled e carregada pelo Phaser 3. O mapa utiliza camadas de objetos para definir comportamentos específicos de cada área: a layer `spawn` define o ponto inicial do personagem ao entrar na cena; a layer `colisoes` bloqueia a movimentação em paredes, móveis e objetos; a layer `porta` configura a zona de saída que aciona a transição para o mapa da cidade (`CidadeScene`); e a layer `professor` delimita a zona invisível que dispara o tutorial ao ser tocada pelo personagem. O personagem é controlado com as setas do teclado e a câmera acompanha o movimento com zoom fixo.

<div align="center">
  <sub>Figura 4.3.3 - Personagem posicionado no ponto de spawn ao iniciar o Espaço Cielo</sub><br>
  <img src="/assets/spawn_escritorio.png" width="100%" alt="Spawn do personagem no escritório"><br>

  <sup>Fonte: Material produzido pelos autores, 2026.</sup>
</div>

<div align="center">
  <sub>Figura 4.3.4 - Visão geral do escritório com debug ativado, indicando as layers de colisão, professor e porta</sub><br>
  <img src="/assets/debug_escritorio.png" width="100%" alt="Debug do escritório com layers visíveis"><br>
  
  <sup>Fonte: Material produzido pelos autores, 2026.</sup>
</div>

### Sistema de Tutorial — tutorial.js

O tutorial foi implementado como uma cena overlay do Phaser, lançada sobre a `MainScene` sem reiniciá-la. Ao colidir com a zona invisível do professor, o jogo é pausado e o tutorial é exibido por cima do mapa com um overlay escuro semitransparente. O conteúdo abrange os quatro principais produtos Cielo apresentados ao novo GNS — Flash, LIO On, Smart e Vendeu, Tá na Conta — distribuídos em 8 falas sequenciais.

As principais funcionalidades implementadas foram: efeito de máquina de escrever, revelando o texto caractere por caractere (30ms por caractere) com animação de boca do professor acompanhando a digitação; clique para pular, que exibe a fala completa imediatamente ao clicar em "Próximo" antes do texto terminar; navegação entre falas com botões "Anterior" e "Próximo" para revisitar os diálogos; e botão "Voltar ao Escritório", que fecha o tutorial e retoma a cena pausada a qualquer momento. Ao concluir a última fala, o jogador é direcionado automaticamente ao mapa da cidade, com o personagem selecionado sendo passado como parâmetro para manter a consistência visual entre as cenas.

<div align="center">
  <sub>Figura 4.3.5 - Tutorial ativo sobre o escritório, exibindo a primeira fala do instrutor com efeito de digitação</sub><br>
  <img src="/assets/tutorial4.png" width="100%" alt="Tutorial em execução sobre o mapa do escritório"><br>
  
  <sup>Fonte: Material produzido pelos autores, 2026.</sup>
</div>

### Sistema de Combate — Perguntas e Respostas

O protótipo funcional do combate foi implementado com base em um sistema de perguntas e respostas entre o NPC e o jogador. O NPC apresenta uma pergunta no canto inferior direito da tela, e o jogador escolhe uma entre duas opções exibidas no canto inferior esquerdo. Cada resposta incrementa ou decrementa a barra de satisfação do cliente em 33 pontos. Se a barra atingir 100, o jogador vence; se chegar a 0 ou se nenhum dos extremos for alcançado após 5 perguntas, o jogador perde.

Tecnicamente, o sistema é sustentado por um array de objetos que armazena as perguntas e suas respectivas respostas corretas e incorretas. Textos interativos foram implementados para associar funções de clique às opções de resposta, conectando essas interações à lógica da barra de satisfação e ao sistema de troca de cenas. Ao atingir um dos extremos da barra, a cena é encerrada e o resultado — vitória ou derrota — é exibido ao jogador.

<div align="center">
  <sub>Figura 4.3.6 - Telas do sistema de combate durante uma interação com o NPC</sub><br>
  <img src="/assets/combate_perguntas.png" width="100%" alt="Sistema de perguntas e respostas com o NPC"><br>
  
  <sup>Fonte: Material produzido pelos autores, 2026.</sup>
</div>

<div align="center">
  <sub>Figura 4.3.7 - Tela de vitória exibida ao convencer o cliente</sub><br>
  <img src="/assets/tela_vitoria.png" width="100%" alt="Tela de vitória com mensagem 'Você convenceu o cliente'"><br>
  
  <sup>Fonte: Material produzido pelos autores, 2026.</sup>
</div>

### Dificuldades Encontradas

Os desafios técnicos desta sprint foram variados e distribuídos entre as frentes de desenvolvimento. Na cena do escritório e tutorial, o overlay do Phaser cobria apenas metade da tela inicialmente, problema resolvido com `setViewport` combinado a um retângulo de dimensões `W*2 x H*2` e `setScrollFactor(0)`. O tutorial disparava em loop ao retornar à cena, o que foi corrigido desabilitando o corpo físico da zona após o primeiro contato e reativando-o com delay de 1000ms. O personagem também aparecia travado ao iniciar a cena por conta de flags de bloqueio no `update()`, removidas para permitir movimentação desde o primeiro frame. O posicionamento preciso da zona do professor exigiu o uso do debug de mouse no próprio jogo para mapear as coordenadas corretas no arquivo `escritorio.json`.

Na cena de personagens, as principais dificuldades foram a ligação dinâmica entre o personagem selecionado e sua tela de informações, o redirecionamento correto dos botões "Voltar" e "Jogar", e o ajuste do tamanho padrão das sprites para que todos os personagens aparecessem com proporções uniformes na tela de seleção.

### Próximos Passos (Sprint 4)

Expansão do Mapa da Cidade: Adicionar novos estabelecimentos comerciais navegáveis e polir os cenários existentes com mais detalhes visuais.
Integração entre Cenas: Conectar o fluxo completo da seleção de personagem até o combate nos diferentes estabelecimentos, garantindo consistência dos dados entre as cenas.
Aprimoramento do Sistema de Combate: Expandir o banco de perguntas, ajustar a progressão da dificuldade e refinar o feedback visual da barra de satisfação.
Inserção de Novos NPCs: Adicionar sprites e diálogos para os clientes dos demais estabelecimentos (loja de roupas e outros comércios).

## 4.4. Desenvolvimento final do MVP (sprint 4)

*Descreva e ilustre aqui o desenvolvimento da versão final do jogo, explicando brevemente o que foi entregue em termos de MVP. Utilize prints de tela para ilustrar. Indique as eventuais dificuldades e planos futuros.*

## 4.5. Revisão do MVP (sprint 5)

*Descreva e ilustre aqui o desenvolvimento dos refinamentos e revisões da versão final do jogo, explicando brevemente o que foi entregue em termos de MVP. Utilize prints de tela para ilustrar.*

# <a name="c5"></a>5. Testes

## 5.1. Casos de Teste (sprints 2 a 4)

#### 5.1.1. CT-01 — Transição da tela inicial para Seleção de Personagens
##### Objetivo
Verificar se o botão **Iniciar** na tela de inicial direciona o usuário para a tela de Escolha de Personagens.
##### Pré-condições
- A cena da **Tela Inicial** deve estar implementada e funcionando.
- A cena da **Escolha dos Personagens** deve existir e ser acessível.
- O jogo deve estar em execução.
- O jogador deve conseguir navegar até a **Tela de Escolha dos Personagens**.
- O recurso visual do botão (asset de imagem ou sprite) deve estar devidamente carregado no método preload.
- O objeto do botão deve estar definido como interativo via setInteractive().
##### Passos para a execução
- Iniciar o jogo e aguardar o carregamento da tela Inicial.
- Localizar o botão identificado como **JOGAR**.
- Posicionar o cursor do mouse (ou toque) sobre o botão.
- Clicar (ou pressionar) o botão uma única vez.
##### Pós-condições
A tela de Escolha de Personagens deve ser exibida com todos os seus elementos (sprites dos personagens jogáveis, nomes, etc.) carregados e prontos para a escolha.

#### 5.1.2. CT-02 — Transição da Tela de Escolha dos personagens para o Espaço Cielo
##### Objetivo 
  Verificar se, ao clicar no botão **CONTINUAR** na tela de escolha dos personagens, o jogador é corretamente direcionado para a cena do **Espaço Cielo**.
##### Pré-condições
- A cena da **Tela Inicial** deve estar implementada e funcionando.
- A cena da **Escolha dos Personagens** deve existir e ser acessível.
- A cena do **Espaço Cielo** deve estar implementada.
- O jogo deve estar em execução.
- O jogador deve conseguir navegar até a **Tela de Escolha dos Personagens**.
##### Passos para Execução
1. Iniciar o jogo.
2. Acessar a **Tela de Escolha dos Personagens**.
3. Localizar o botão **CONTINUAR** na interface.
4. Clicar no botão **CONTINUAR**.

##### Pós-condições
- O jogo deve realizar a transição da **Tela de Escolha dos Personagens** para a cena do **Espaço Cielo**.
- O mapa ou ambiente do **Espaço Cielo** deve ser carregado corretamente.
- O personagem selecionado pelo jogador deve aparecer no mapa.
- O jogador deve conseguir movimentar o personagem normalmente após a transição.


#### 5.1.3. CT-03 — Início do Tutorial ao Colidir com o Estadual
##### Objetivo
Verificar se o **tutorial é iniciado corretamente** quando o jogador colide com a área de colisão associada ao **Estadual** no mapa do Espaço Cielo.
##### Pré-condições
- A cena do **Espaço Cielo** deve estar implementada e funcionando.
- Deve existir uma **área de colisão configurada** para o Estadual.
- O **sistema de tutorial** deve estar implementado e funcional.
- O personagem do jogador deve estar carregado e capaz de se movimentar no mapa.
##### Passos para Execução
1. Iniciar o jogo.
2. Acessar a cena do **Espaço Cielo**.
3. Utilizar as teclas **UP, DOWN, LEFT e RIGHT** para movimentar o personagem.
4. Conduzir o personagem até a **área de colisão do Estadual**.
5. Colidir com essa área.
##### Pós-condições
- Ao colidir com a área de colisão do **Estadual**, o tutorial deve iniciar automaticamente.
- A interface do tutorial (mensagens, instruções ou elementos visuais) devem aparecer na tela.
- O tutorial deve ser exibido sem erros ou travamentos.

#### 5.1.4. CT-04 — Transição de cena do Espaço Cielo para o mapa da cidade
##### Objetivo 
  Verificar se a colisão do jogador com a zona de porta do **Espaço Cielo** (layer 'porta') aciona o evento de transição e direciona o jogador ao mapa da cidade **CidadeScene**.
##### Pré-condições
- Jogo iniciado. 
- Personagem selecionado na tela de seleção. 
- Jogador posicionado no Espaço Cielo **MainScene**. 
- Tutorial concluído ou dispensado via botão **Voltar ao Escritório**.
##### Passos para Execução
1. Iniciar o jogo e selecionar um personagem na tela de seleção.
2. Aguardar o carregamento do Espaço Cielo **MainScene**.
3. Mover o personagem em direção ao **Estadual** para acionar o tutorial.
4. Avançar todos os diálogos do tutorial até a última fala e clicar em **Próximo**, ou clicar em **Voltar ao Escritório**.
5. Mover o personagem em direção à saída do escritório até sobrepor a zona de colisão da layer 'porta'.
6. Verificar se o evento de transição de cena é disparado automaticamente.
7. Verificar se a cena **CidadeScene** é carregada com o personagem correto.

##### Pós-condições
O sistema inicia a **CidadeScene** passando o personagem selecionado via data. O mapa da cidade é exibido sem erros no console.

#### 5.1.5. CT-05 — Validar transição de cena ao colidir com a padaria no mapa

##### Objetivo 
Verificar se a representação da padaria no mapa da cidade possui colisão funcional que dispara a transição para a cena **Padaria** e exibe os diálogos corretamente.

##### Pré-condições
- Jogo iniciado.
- Personagem selecionado. 
- Jogador posicionado no mapa da cidade **CidadeScene**. 
- Cena **Padaria** registrada no array de cenas do game.js.

##### Passos para Execução
1. Concluir a transição do Espaço Cielo para o mapa da cidade (CT-04).
2. Localizar a representação da padaria no mapa da **CidadeScene**.
3. Mover o personagem em direção à entrada da padaria.
4. Posicionar o personagem sobre o objeto de colisão da padaria no mapa.
5. Verificar se o evento de transição é disparado automaticamente.
6. Verificar se a cena **Padaria** é carregada com o personagem correto.
7. Verificar se os diálogos da cena da **padaria** são exibidos na tela.

##### Pós-condições
O sistema inicia a cena **Padaria**, exibe o ambiente e o personagem selecionado, e apresenta os diálogos da padaria sem erros no console.



## 5.2. Testes de jogabilidade (playtests) (sprint 5)

### 5.2.1 Registros de testes

*Descreva nesta seção as sessões de teste/entrevista com diferentes jogadores. Registre cada teste conforme o template a seguir.*

Nome | João Jonas (use nomes fictícios)
--- | ---
Já possuía experiência prévia com games? | sim, é um jogador casual
Conseguiu iniciar o jogo? | sim
Entendeu as regras e mecânicas do jogo? | entendeu as regras, mas sobre as mecânicas, apenas as essenciais, não explorou os comandos complexos
Conseguiu progredir no jogo? | sim, sem dificuldades  
Apresentou dificuldades? | Não, conseguiu jogar com facilidade e afirmou ser fácil
Que nota deu ao jogo? | 9.0
O que gostou no jogo? | Gostou  de como o jogo vai ficando mais difícil ao longo do tempo sem deixar de ser divertido
O que poderia melhorar no jogo? | A responsividade do personagem aos controles, disse que havia um pouco de atraso desde o momento do comando até a resposta do personagem

### 5.2.2 Melhorias

*Descreva nesta seção um plano de melhorias sobre o jogo, com base nos resultados dos testes de jogabilidade*

# <a name="c6"></a>6. Conclusões e trabalhos futuros (sprint 5)

*Escreva de que formas a solução do jogo atingiu os objetivos descritos na seção 1 deste documento. Indique pontos fortes e pontos a melhorar de maneira geral.*

*Relacione os pontos de melhorias evidenciados nos testes com plano de ações para serem implementadas no jogo. O grupo não precisa implementá-las, pode deixar registrado aqui o plano para futuros desenvolvimentos.*

*Relacione também quaisquer ideias que o grupo tenha para melhorias futuras*

# <a name="c7"></a>7. Referências (sprint 5)

ASSOCIAÇÃO BRASILEIRA DAS EMPRESAS DE CARTÕES DE CRÉDITO E SERVIÇOS. Relatório anual do setor de meios eletrônicos de pagamento. 2023. Disponível em: https://www.abecs.org.br

BANCO CENTRAL DO BRASIL. Relatório sobre a indústria de cartões de pagamento. 2010. Disponível em: https://www.bcb.gov.br

BANCO CENTRAL DO BRASIL. Lei nº 12.865, de 9 de outubro de 2013. 2013. Disponível em: https://www.bcb.gov.br

BANCO CENTRAL DO BRASIL. PIX: o novo meio de pagamento instantâneo brasileiro. 2020. Disponível em: https://www.bcb.gov.br

BIZ. O mercado de adquirência no Brasil: tradicionais vs. fintechs. 2024. Disponível em: https://biz.com.br/artigos/mercado-adquirencia

BLOOMBERG LÍNEA. Na guerra das maquininhas, PagSeguro apostou em banco e agora acelera os planos. 2022. Disponível em: https://www.bloomberglinea.com.br/2022/09/12/na-guerra-das-maquininhas-pagseguro-apostou-em-banco-e-agora-acelera-os-planos/

BP MONEY. Mercado Pago lidera lucros e ultrapassa Stone e PagBank. 2024. Disponível em: https://bpmoney.com.br/economia/mercado-pago-lidera-lucros/

BTG PACTUAL. Cielo (CIEL3): análise de ativo e research. São Paulo: BTG Pactual, 2024. Disponível em: https://content.btgpactual.com/research/ativo/CIEL3

CIELO. Relatório de resultados 4T23 e projeções estratégicas. 2024. Disponível em: https://ri.cielo.com.br/

CIELO. Maquininhas e tipos de soluções. 2026. Disponível em: https://www.cielo.com.br

CIELO. Cielo 30 anos: linha do tempo da empresa se confunde com a própria história dos meios de pagamentos no Brasil. Disponível em: https://blog.cielo.com.br/institucional/linha-do-tempo-cielo/

CNN BRASIL. A “guerra das maquininhas” acabou? Entenda para onde vai o mercado de pagamentos. 2020. Disponível em: https://www.cnnbrasil.com.br/tecnologia/a-guerra-das-maquininhas-acabou-entenda-para-onde-vai-o-mercado-de-pagamentos/

CONCIL. Guerra das maquininhas: o que todo varejista precisa saber. 2019. Disponível em: https://www.concil.com.br/guerra-das-maquininhas-o-que-todo-varejista-precisa-saber/

CONSUMIDOR MODERNO. A história da maquininha de cartão e sua evolução no Brasil. 2018. Disponível em: https://consumidormoderno.com.br/historia-maquininha-de-cartao/

DATAFOLHA. Mais de 15,5 milhões de brasileiros se identificam como LGBTQIA+. São Paulo: Datafolha, 2022. Disponível em: https://odia.ig.com.br/brasil/2022/09/6492474-datafolha-mais-de-155-milhoes-de-brasileiros-se-identificam-como-lgbtqia-.html

DIARCHANGELI, Dean-Raul. City Office Ambience. [S.l.]: Pixabay, 2012. 1 arquivo sonoro (2 min 33 s). Disponível em: https://pixabay.com/sound-effects/city-office-ambience-6322/.

DOCK TECH. Pix: sistema de pagamentos instantâneos do Banco Central completa cinco anos. 2025. Disponível em: https://dock.tech/fluid/blog/financeiro/pix-sistema-pagamentos-instantaneos-banco-central/

EDRONE. Os dados do e-commerce no Brasil são animadores e colocam o país entre os maiores players deste mercado para os próximos anos. 2026. Disponível em: https://edrone.me/pt/blog/dados-ecommerce-brasil

EDUCANDO SEU BOLSO. Ranking de máquinas de cartão. 2025. Disponível em: https://educandoseubolso.blog.br/rankings/ranking-de-maquinas-de-cartao/

EXAME. Uma pedra no sapato da turma das maquininhas. 2019. Disponível em: https://exame.com/revista-exame/uma-pedra-no-sapato/

EXAME. Além das maquininhas. 2024. Disponível em: https://exame.com/revista-exame/alem-das-maquininhas/

EXAME. 3 anos de Open Finance no Brasil: os benefícios, desafios e perspectivas futuras. 2024. Disponível em: https://exame.com/future-of-money/3-anos-de-open-finance-no-brasil-os-beneficios-desafios-e-perspectivas-futuras/

FINSIDERS BRASIL. Nubank e Inter são “vencedores claros” na corrida dos bancos digitais, diz Itaú BBA. 2023. Disponível em: https://finsidersbrasil.com.br/negocios-em-fintechs/nubank-e-inter-sao-vencedores-claros-na-corrida-dos-bancos-digitais-diz-itau-bba/

FORBES BRASIL. Cielo foca em eficiência operacional e novos serviços para combater avanço do Pix. 2024. Disponível em: https://forbes.com.br/forbes-money/2024/02/cielo-tem-lucro-liquido-de-r-490-milhoes-no-4o-trimestre/

IBGE. Censo 2022: Brasil tem 14,4 milhões de pessoas com deficiência. Rio de Janeiro: IBGE, 2025. Disponível em: https://agenciadenoticias.ibge.gov.br/agencia-noticias/noticias/43463-censo-2022-brasil-tem-14-4-milhoes-de-pessoas-com-deficiencia

IBGE. Censo 2022: número de pessoas com 65 anos ou mais cresceu 57,4% em 12 anos. Rio de Janeiro: IBGE, 2023. Disponível em: https://agenciadenoticias.ibge.gov.br/agencia-noticias/noticias/38186-censo-2022-numero-de-pessoas-com-65-anos-ou-mais-de-idade-cresceu-57-4-em-12-anos

IDINHEIRO. Maquininha de cartão de crédito. 2025. Disponível em: https://www.idinheiro.com.br/negocios/maquininha-de-cartao-de-credito/

INFOMONEY. Como o Pix virou uma ameaça para o mercado das maquininhas de cartão. 2023. Disponível em: https://www.infomoney.com.br/mercados/como-o-pix-virou-uma-ameaca-para-o-mercado-das-maquininhas-de-cartao/

INFOMONEY. Cielo sai da bolsa: o que muda para a empresa e para o setor. 2024. Disponível em: https://www.infomoney.com.br/mercados/cielo-fechamento-de-capital-reestruturacao/

INFOMONEY. PagSeguro e Stone: mudanças na gestão podem marcar um ponto de inflexão. 2026. Disponível em: https://www.infomoney.com.br/mercados/pagseguro-e-stone-mudancas-na-gestao-podem-marcar-um-ponto-de-inflexao/

INOVADESK. Por que o aumento de preços de componentes está impactando computadores em 2026 e como as empresas podem se preparar. 2026. Disponível em: https://blog.inovadesk.com.br/aumento-precos-componentes-impacto-computadores-2026/

INVESTNEWS. As estratégias das adquirentes para recuperar margens com IA e novos produtos. 2025. Disponível em: https://investnews.com.br/financas/estrategias-adquirentes-2025/

INVESTING. Controladores fazem oferta de US$ 1,2 bilhão para fechar o capital da Cielo. 2026. Disponível em: https://www.investing.com/news/stock-market-news/controlling-shareholders-bid-to-take-brazil-payments-firm-cielo-private-for-12-billion-3293319

INVESTNEWS. Por que a Cielo vale menos se é líder de mercado? 2021. Disponível em: https://investnews.com.br/colunistas/por-que-a-cielo-vale-menos-se-e-lider-de-mercado/

ITAÚ BBA. Cielo (CIEL3): previsão de resultados do 3T23. São Paulo: Itaú BBA, 2023. Disponível em: https://mindassets.cloud.itau.com.br/attachments/688d93a7-c65d-4db5-a436-1934a1c38220/DAP_CIEL_20231101.pdf

MOBILE TIME. Tap to Phone e a desmaterialização das maquininhas no Brasil. 2025. Disponível em: https://www.mobiletime.com.br/noticias/22/01/2025/tap-to-phone-brasil/

PININFARINA BRASIL. Maquininha de cartão: as que dominam o mercado em 2025. 2025. Disponível em: https://www.pininfarina.com.br/maquininha-de-cart%C3%A3o-as-que-dominam-o-mercado-em-2025

PORTER, Michael E. Estratégia competitiva: técnicas para análise de indústrias e da concorrência. Rio de Janeiro: Elsevier, 2004.

SEU DINHEIRO. PagSeguro apresenta suas armas na guerra das maquininhas de cartão. 2019. Disponível em: https://www.seudinheiro.com/2019/economia/pagseguro-apresenta-suas-armas-na-guerra-das-maquininhas-de-cartao/

SEWELL, Lindsey. Musical Cottagecore. [S.l.]: Pixabay, 2021. 1 arquivo sonoro (2 min 38 s). Disponível em: https://pixabay.com/pt/sound-effects/musical-cottagecore-17463/.

SILVA LOPES ADVOGADOS. Modelos de negócio no setor de pagamentos: adquirentes e subadquirentes. 2024. Disponível em: https://silvalopes.adv.br/modelos-pagamentos/

SUNO NOTÍCIAS. Cielo e o desafio do setor de maquininhas: como a empresa se reinventa. 2024. Disponível em: https://www.suno.com.br/noticias/cielo-ciel3-desafios-setor-adquirencia/

VALOR ECONÔMICO. A estratégia das adquirentes para não perder espaço para o pagamento instantâneo. 2023. Disponível em: https://valor.globo.com/financas/noticia/2023/10/20/maquininhas-se-adaptam-ao-pix.ghtml

XTREMEFREDDY. Musical Game Music Loop 7. [S.l.]: Pixabay, 2023. 1 arquivo sonoro (1 min 15 s). Disponível em: https://pixabay.com/pt/sound-effects/musical-game-music-loop-7-145285/.

ZHELANOV, Alexandr. Oops. [S.l.]: OpenGameArt, 2014. 1 arquivo sonoro (1 s). Disponível em: https://opengameart.org/content/oops.
















# <a name="c8"></a>Anexos

*Inclua aqui quaisquer complementos para seu projeto, como diagramas, imagens, tabelas etc. Organize em sub-tópicos utilizando headings menores (use ## ou ### para isso)*



