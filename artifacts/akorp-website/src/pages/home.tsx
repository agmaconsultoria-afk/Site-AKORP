import React, { useEffect, useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ChevronRight, ArrowRight, TrendingUp, ShieldCheck, Target, BarChart3, Menu, X, Building2, Briefcase, Mail, Phone, MapPin, Leaf, Search, FileText, Zap, Award } from "lucide-react";
import { Button } from "@/components/ui/button";

const FADE_UP = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const STAGGER = {
  hidden: { opacity: 0 },
  visible: { transition: { staggerChildren: 0.2 } }
};

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? "bg-white/95 backdrop-blur-md shadow-sm py-4" : "bg-transparent py-6"}`}>
      <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 z-50">
          <span className={`font-serif text-2xl font-bold tracking-wider ${scrolled ? "text-primary" : "text-white"}`}>AKORP</span>
          <span className={`text-xs tracking-widest font-medium uppercase mt-1 hidden sm:block ${scrolled ? "text-muted-foreground" : "text-white/70"}`}>Gestão Empresarial</span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-8">
          {["Sobre", "Consultor", "Clientes", "Especialidades", "Metodologia"].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className={`text-sm uppercase tracking-wider font-medium transition-colors hover:text-accent ${scrolled ? "text-primary/80" : "text-white/90"}`}>
              {item}
            </a>
          ))}
          <Button variant={scrolled ? "default" : "outline"} className={scrolled ? "bg-primary text-white" : "border-white text-white hover:bg-white hover:text-primary"} asChild>
            <a href="#contato">Fale com um Sócio</a>
          </Button>
        </nav>

        <button className="md:hidden z-50" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X className={scrolled ? "text-primary" : "text-white"} /> : <Menu className={scrolled ? "text-primary" : "text-white"} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-white z-40 flex flex-col items-center justify-center gap-8 px-6">
          {["Sobre", "Consultor", "Clientes", "Especialidades", "Metodologia"].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMobileMenuOpen(false)} className="text-2xl font-serif text-primary">
              {item}
            </a>
          ))}
          <Button size="lg" className="w-full max-w-xs mt-4" asChild>
            <a href="#contato" onClick={() => setMobileMenuOpen(false)}>Fale com um Sócio</a>
          </Button>
        </div>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section className="relative min-h-[100dvh] flex items-center pt-20 overflow-hidden bg-primary">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/80 to-primary/30 z-10" />
        <img src="/hero-bg.png" alt="Corporate background" className="w-full h-full object-cover object-center opacity-40" />
      </div>

      {/* Gears image — right side decorative element */}
      <motion.div
        initial={{ opacity: 0, x: 80 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.2, ease: "easeOut", delay: 0.4 }}
        className="absolute right-0 top-0 bottom-0 w-1/2 z-10 hidden lg:flex items-center justify-end"
      >
        <div className="relative w-full h-full">
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/60 to-transparent z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-primary/40 z-10" />
          <motion.img
            src="/gears.png"
            alt="Engrenagens industriais — trabalho em conjunto"
            className="w-full h-full object-cover object-left mix-blend-luminosity opacity-70"
            animate={{ rotate: [0, 1, -1, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
      
      <div className="container relative z-20 mx-auto px-6 md:px-12">
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={STAGGER}
          className="max-w-3xl"
        >
          <motion.div variants={FADE_UP} className="flex items-center gap-4 mb-8">
            <div className="h-[1px] w-12 bg-accent" />
            <span className="text-accent uppercase tracking-[0.2em] text-sm font-semibold">Consultoria de Alto Valor</span>
          </motion.div>
          
          <motion.h1 variants={FADE_UP} className="text-5xl md:text-7xl font-serif text-white leading-[1.1] mb-8">
            Inteligência e estratégia para negócios que não aceitam <span className="italic text-white/70">o limite.</span>
          </motion.h1>
          
          <motion.p variants={FADE_UP} className="text-lg md:text-xl text-white/80 font-light leading-relaxed mb-12 max-w-2xl">
            Ajudamos empresas a crescerem com eficiência, blindagem financeira e execução impecável. Decisões baseadas em dados, executadas por quem entende a realidade do empresário brasileiro.
          </motion.p>
          
          <motion.div variants={FADE_UP} className="flex flex-col sm:flex-row gap-6">
            <Button size="lg" className="bg-white hover:bg-white/90 text-primary rounded-none h-14 px-8 text-sm tracking-wider uppercase font-semibold" asChild>
              <a href="#contato">Solicitar Diagnóstico <ArrowRight className="ml-2 h-4 w-4" /></a>
            </Button>
            <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 rounded-none h-14 px-8 text-sm tracking-wider uppercase font-semibold" asChild>
              <a href="#especialidades">Conhecer Especialidades</a>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="sobre" className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={STAGGER}
          >
            <motion.h2 variants={FADE_UP} className="text-4xl md:text-5xl font-serif text-primary mb-8">
              Sua empresa chegou até aqui com o seu esforço. <br/>
              <span className="text-muted-foreground italic">Nós ajudamos a levá-la ao próximo nível.</span>
            </motion.h2>
            <motion.div variants={FADE_UP} className="space-y-6 text-muted-foreground leading-relaxed">
              <p>
                A AKORP não é uma consultoria de prateleira. Somos parceiros estratégicos de empresários que buscam estruturação, rentabilidade e governança de forma prática e executável.
              </p>
              <p>
                Entendemos que o papel do dono é pensar no futuro do negócio, não ser consumido pela operação. Nossa missão é criar a musculatura financeira e estratégica para que sua empresa opere com previsibilidade e cresça com segurança.
              </p>
            </motion.div>
            
            <motion.div variants={FADE_UP} className="mt-12 grid grid-cols-2 gap-8 border-t border-border pt-12">
              <div>
                <h4 className="text-4xl font-serif text-primary mb-2">15+</h4>
                <p className="text-sm text-muted-foreground uppercase tracking-wider font-medium">Anos de Experiência</p>
              </div>
              <div>
                <h4 className="text-4xl font-serif text-primary mb-2">R$ 2B+</h4>
                <p className="text-sm text-muted-foreground uppercase tracking-wider font-medium">Em Receita Otimizada</p>
              </div>
            </motion.div>
          </motion.div>
          
          <div className="relative">
            <div className="absolute inset-0 bg-primary/5 translate-x-4 translate-y-4 -z-10" />
            <img src="/boardroom.png" alt="Boardroom" className="w-full h-auto object-cover grayscale-[20%] contrast-125" />
          </div>
        </div>
      </div>
    </section>
  );
}

function OurStory() {
  const leaves = [
    {
      title: "Preparar o Terreno",
      desc: "A boa sorte não nasce em terreno árido. Antes de qualquer crescimento, estruturamos o solo: processos, finanças, governança. Sem isso, nenhuma oportunidade consegue enraizar.",
    },
    {
      title: "Cultivar com Método",
      desc: "Victor não esperou a sorte aparecer — ele capinou, regou, adubo a terra todos os dias. Nós fazemos o mesmo: acompanhamento contínuo, ajuste de rota e execução disciplinada ao lado da sua equipe.",
    },
    {
      title: "Proteger o que Foi Construído",
      desc: "O trevo só floresce num ambiente protegido. Compliance, governança e controles internos são a cerca que garante que o crescimento não seja destruído por dentro.",
    },
    {
      title: "Colher os Resultados",
      desc: "Quando as condições certas estão criadas, a boa sorte deixa de ser acaso e passa a ser consequência. Empresas que trabalham conosco não esperam por oportunidades — elas as produzem.",
    },
  ];

  return (
    <section id="historia" className="py-24 md:py-36 bg-secondary overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">

        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={STAGGER}
          className="max-w-3xl mb-20"
        >
          <motion.div variants={FADE_UP} className="flex items-center gap-4 mb-8">
            <div className="h-[1px] w-12 bg-primary/30" />
            <span className="text-primary/50 uppercase tracking-[0.2em] text-xs font-semibold">Nossa Origem</span>
          </motion.div>
          <motion.h2 variants={FADE_UP} className="text-4xl md:text-6xl font-serif text-primary leading-tight mb-8">
            A empresa nasceu de uma fábula — e de uma convicção.
          </motion.h2>
          <motion.p variants={FADE_UP} className="text-muted-foreground text-lg font-light leading-relaxed">
            No livro <span className="italic text-primary font-medium">"A Boa Sorte"</span>, de Álex Rovira e Fernando Trias de Bes, dois cavaleiros recebem a mesma missão: encontrar um trevo de quatro folhas para o rei. Um sai à procura do trevo que já existe. O outro cria as condições para que o trevo cresça.
          </motion.p>
        </motion.div>

        {/* Fable quote block */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="bg-primary text-white p-10 md:p-16 mb-20 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 opacity-5">
            <Leaf className="w-64 h-64 text-white -translate-y-16 translate-x-16" />
          </div>
          <div className="relative z-10 max-w-3xl">
            <div className="flex items-start gap-6 mb-8">
              <div className="shrink-0 w-12 h-12 bg-white/10 flex items-center justify-center">
                <Leaf className="w-5 h-5 text-white/70" />
              </div>
              <div>
                <p className="text-white/50 uppercase tracking-widest text-xs font-semibold mb-2">A Fábula</p>
                <h3 className="text-2xl md:text-3xl font-serif italic leading-relaxed text-white/90">
                  "A má sorte é sempre igual para todos. A boa sorte, porém, precisa ser criada — e só existe para quem prepara as condições certas."
                </h3>
              </div>
            </div>
            <p className="text-white/60 text-sm font-light pl-[72px]">
              — Álex Rovira &amp; Fernando Trias de Bes, <span className="italic">A Boa Sorte</span>
            </p>
          </div>
        </motion.div>

        {/* Connecting to AKORP */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={STAGGER}
          className="mb-20"
        >
          <motion.p variants={FADE_UP} className="text-muted-foreground text-lg font-light leading-relaxed max-w-3xl mb-6">
            Foi com essa convicção que a AKORP nasceu. Ao ler a história de Victor — o cavaleiro que venceu não por ter achado o trevo, mas por ter criado o ambiente onde ele poderia brotar — o fundador Anderson Procópio encontrou a filosofia que nortearia cada projeto, cada diagnóstico, cada parceria.
          </motion.p>
          <motion.p variants={FADE_UP} className="text-muted-foreground text-lg font-light leading-relaxed max-w-3xl">
            A AKORP não busca oportunidades prontas para os seus clientes. <span className="text-primary font-medium">Nós construímos o terreno onde as oportunidades conseguem crescer.</span> Isso é o que nos separa de qualquer outra consultoria.
          </motion.p>
        </motion.div>

        {/* Four leaves */}
        <div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={FADE_UP}
            className="flex items-center gap-4 mb-10"
          >
            <Leaf className="h-5 w-5 text-primary" />
            <span className="text-primary font-serif text-xl">As Quatro Folhas do Trevo AKORP</span>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-border">
            {leaves.map((leaf, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.12, duration: 0.7, ease: "easeOut" }}
                className="bg-secondary p-8 md:p-10 group hover:bg-primary transition-colors duration-500"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 bg-primary/10 group-hover:bg-white/10 transition-colors flex items-center justify-center">
                    <Leaf className="h-4 w-4 text-primary group-hover:text-white/70 transition-colors" />
                  </div>
                  <span className="text-primary/50 group-hover:text-white/40 transition-colors text-xs uppercase tracking-widest font-semibold">Folha {idx + 1}</span>
                </div>
                <h4 className="font-serif text-xl text-primary group-hover:text-white transition-colors mb-4">{leaf.title}</h4>
                <p className="text-muted-foreground group-hover:text-white/70 transition-colors text-sm leading-relaxed font-light">{leaf.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

function Consultant() {
  return (
    <section id="consultor" className="py-24 md:py-32 bg-primary text-white overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={STAGGER}
          >
            <motion.div variants={FADE_UP} className="flex items-center gap-4 mb-8">
              <div className="h-[1px] w-12 bg-white/40" />
              <span className="text-white/60 uppercase tracking-[0.2em] text-xs font-semibold">Consultor Principal</span>
            </motion.div>

            <motion.h2 variants={FADE_UP} className="text-4xl md:text-5xl font-serif mb-4 leading-tight">
              Anderson De Oliveira <br />Reis Procópio
            </motion.h2>

            <motion.p variants={FADE_UP} className="text-white/60 uppercase tracking-widest text-xs font-semibold mb-10">
              Consultor de Compliance
            </motion.p>

            <motion.div variants={FADE_UP} className="space-y-6 text-white/75 font-light leading-relaxed text-lg">
              <p>
                Com mais de 20 anos de atuação em consultoria empresarial, Anderson Procópio acumula uma trajetória sólida nas áreas de Diretoria de Controladoria e Recursos Humanos, aliando visão estratégica à precisão técnica.
              </p>
              <p>
                Sua expertise em Compliance garante que as empresas assessoradas operem com governança robusta, mitigando riscos regulatórios e construindo estruturas que suportam crescimento sustentável e seguro.
              </p>
            </motion.div>

            <motion.div variants={FADE_UP} className="mt-12 grid grid-cols-3 gap-6 border-t border-white/10 pt-12">
              <div>
                <h4 className="text-3xl font-serif mb-2">20+</h4>
                <p className="text-xs text-white/50 uppercase tracking-wider font-medium">Anos de Experiência</p>
              </div>
              <div>
                <h4 className="text-3xl font-serif mb-2">3</h4>
                <p className="text-xs text-white/50 uppercase tracking-wider font-medium">Áreas de Especialização</p>
              </div>
              <div>
                <h4 className="text-3xl font-serif mb-2">C-Level</h4>
                <p className="text-xs text-white/50 uppercase tracking-wider font-medium">Experiência em Diretoria</p>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-white/5 rounded-sm" />
            <div className="relative bg-white/5 border border-white/10 p-10 md:p-12">
              <div className="flex items-center gap-4 mb-10">
                <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center">
                  <Briefcase className="h-6 w-6 text-white/70" />
                </div>
                <div>
                  <p className="font-serif text-lg">Anderson Procópio</p>
                  <p className="text-white/50 text-sm">Consultor de Compliance</p>
                </div>
              </div>

              <div className="space-y-6">
                {[
                  { label: "Consultoria Empresarial", years: "20+ anos" },
                  { label: "Diretoria de Controladoria", years: "Experiência C-Level" },
                  { label: "Recursos Humanos", years: "Gestão Estratégica" },
                  { label: "Compliance Corporativo", years: "Especialização" },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 + 0.3, duration: 0.6 }}
                    className="flex items-center justify-between border-b border-white/10 pb-6 last:border-0 last:pb-0"
                  >
                    <div className="flex items-center gap-3">
                      <ChevronRight className="h-4 w-4 text-white/40 shrink-0" />
                      <span className="text-white/80 font-medium">{item.label}</span>
                    </div>
                    <span className="text-white/40 text-sm font-light whitespace-nowrap ml-4">{item.years}</span>
                  </motion.div>
                ))}
              </div>

              <div className="mt-10 pt-8 border-t border-white/10">
                <Button className="w-full bg-white text-primary hover:bg-white/90 rounded-none h-12 text-sm tracking-wider uppercase font-semibold" asChild>
                  <a href="#contato">Fale com Anderson</a>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Services() {
  const services = [
    {
      icon: <Target className="h-8 w-8" />,
      title: "Estratégia e Planejamento",
      desc: "Mapeamento de cenários, definição de OKRs e estruturação de plano de expansão com metas claras e executáveis."
    },
    {
      icon: <BarChart3 className="h-8 w-8" />,
      title: "Gestão Financeira",
      desc: "Reestruturação de fluxo de caixa, precificação inteligente, redução de custos invisíveis e otimização de margem."
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      title: "Reestruturação Empresarial",
      desc: "Turnaround focado em recuperação de rentabilidade, renegociação de passivos e otimização de estrutura."
    },
    {
      icon: <ShieldCheck className="h-8 w-8" />,
      title: "Governança e Sucessão",
      desc: "Implementação de conselhos, acordos de sócios e preparação estrutural para M&A ou passagem de bastão."
    }
  ];

  return (
    <section id="especialidades" className="py-24 md:py-32 bg-secondary">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-3xl mx-auto text-center mb-20">
          <span className="text-accent uppercase tracking-[0.2em] text-sm font-semibold block mb-4">Expertise Core</span>
          <h2 className="text-4xl md:text-5xl font-serif text-primary mb-6">Atuação cirúrgica onde o negócio mais precisa</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {services.map((srv, idx) => (
            <motion.div 
              key={idx}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={FADE_UP}
              className="bg-white p-10 group hover:bg-primary transition-colors duration-500"
            >
              <div className="text-accent mb-8 group-hover:text-white transition-colors">{srv.icon}</div>
              <h3 className="text-2xl font-serif text-primary mb-4 group-hover:text-white transition-colors">{srv.title}</h3>
              <p className="text-muted-foreground group-hover:text-white/80 transition-colors leading-relaxed">
                {srv.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Process() {
  const BW = 155, BH = 84, GAP = 40, BY = 72, MY = BY + BH / 2;
  const BX = [110, 305, 500, 695, 890];
  const CX = BX.map(x => x + BW / 2);
  const DY = BY + BH + 14;

  const steps = [
    { number: "01", title: "Imersão",     period: "Sem. 1–2",   deliverable: "Raio-X do negócio",    desc: "Mergulhamos fundo na operação: financeiro, RH, processos e estrutura. Nenhum gargalo passa despercebido." },
    { number: "02", title: "Diagnóstico", period: "Sem. 3",     deliverable: "Relatório priorizado",  desc: "Um mapa claro de riscos e oportunidades — organizado por impacto e urgência, sem jargões, pronto para decisão." },
    { number: "03", title: "Plano Tático",period: "Sem. 4",     deliverable: "Roadmap 90 dias",       desc: "Ações concretas com responsáveis, prazos e KPIs definidos. Calibrado para a sua realidade — nada genérico." },
    { number: "04", title: "Execução",    period: "Meses 2–3",  deliverable: "Acomp. quinzenal",      desc: "Trabalhamos lado a lado com a sua liderança: revisão de indicadores e ajuste de rota a cada quinzena." },
    { number: "05", title: "Resultados",  period: "Mês 3+",     deliverable: "Impacto mensurável",    desc: "Entregamos os resultados acordados e transferimos o know-how para que a equipe mantenha o ritmo de forma autônoma." },
  ];

  return (
    <section className="py-24 md:py-36 bg-primary text-white overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">

        {/* Header */}
        <motion.div
          initial="hidden" whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={STAGGER}
          className="text-center mb-16"
        >
          <motion.div variants={FADE_UP} className="flex items-center justify-center gap-4 mb-6">
            <div className="h-[1px] w-12 bg-white/20" />
            <span className="text-white/40 uppercase tracking-[0.2em] text-xs font-semibold">Da Contratação aos Resultados</span>
            <div className="h-[1px] w-12 bg-white/20" />
          </motion.div>
          <motion.h2 variants={FADE_UP} className="text-4xl md:text-5xl font-serif mb-4">
            Como a AKORP trabalha
          </motion.h2>
          <motion.p variants={FADE_UP} className="text-white/60 max-w-xl mx-auto font-light text-lg">
            Um processo estruturado e transparente — do primeiro contato à transferência de know-how.
          </motion.p>
        </motion.div>

        {/* ── DESKTOP SVG FLOWCHART ── */}
        <motion.div
          className="hidden md:block"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <svg viewBox="0 0 1200 218" className="w-full" role="img" aria-label="Fluxograma do processo AKORP">

            {/* Ghost axis */}
            <line x1="55" y1={MY} x2="1145" y2={MY} stroke="white" strokeOpacity="0.08" strokeWidth="1.5" />

            {/* Animated axis drawing left → right */}
            <motion.line
              x1="55" y1={MY} x2="1145" y2={MY}
              stroke="#ededed" strokeOpacity="0.45" strokeWidth="1.5"
              strokeDasharray="1200"
              initial={{ strokeDashoffset: 1200 }}
              whileInView={{ strokeDashoffset: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.6, ease: "easeInOut", delay: 0.2 }}
            />

            {/* START pill */}
            <rect x="8" y={MY - 14} width="92" height="28" rx="14"
              fill="none" stroke="white" strokeOpacity="0.25" strokeWidth="1" />
            <text x="54" y={MY + 5} textAnchor="middle" fontSize="10"
              fill="white" fillOpacity="0.5" fontFamily="system-ui,sans-serif" letterSpacing="1.5">INÍCIO</text>

            {/* Arrow: start → box 1 */}
            <polygon points={`${BX[0]-10},${MY-5} ${BX[0]},${MY} ${BX[0]-10},${MY+5}`}
              fill="white" fillOpacity="0.4" />

            {/* 5 STEP BOXES */}
            {steps.map((step, i) => (
              <motion.g
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + i * 0.16, duration: 0.65, ease: "easeOut" }}
              >
                {/* Arrow from previous box */}
                {i > 0 && (
                  <polygon
                    points={`${BX[i]-10},${MY-5} ${BX[i]},${MY} ${BX[i]-10},${MY+5}`}
                    fill="white" fillOpacity="0.4"
                  />
                )}

                {/* Box shadow / glow layer */}
                <rect x={BX[i] + 2} y={BY + 2} width={BW} height={BH} rx="4"
                  fill="black" fillOpacity="0.18" />

                {/* Main box */}
                <rect x={BX[i]} y={BY} width={BW} height={BH} rx="4"
                  fill="white" fillOpacity="0.09"
                  stroke="white" strokeOpacity="0.22" strokeWidth="1" />

                {/* Step number */}
                <text x={CX[i]} y={BY + 19} textAnchor="middle" fontSize="9.5"
                  fill="white" fillOpacity="0.38" fontFamily="system-ui" letterSpacing="2.5">
                  {step.number}
                </text>

                {/* Step title */}
                <text x={CX[i]} y={BY + 44} textAnchor="middle" fontSize="15.5"
                  fill="white" fontFamily="Georgia,'Times New Roman',serif">
                  {step.title}
                </text>

                {/* Period */}
                <text x={CX[i]} y={BY + 64} textAnchor="middle" fontSize="9.5"
                  fill="white" fillOpacity="0.38" fontFamily="system-ui">
                  {step.period}
                </text>

                {/* Connector line down to deliverable */}
                <line x1={CX[i]} y1={BY + BH} x2={CX[i]} y2={DY}
                  stroke="white" strokeOpacity="0.2" strokeWidth="1" strokeDasharray="3,2" />

                {/* Deliverable badge */}
                <rect x={BX[i] + 8} y={DY} width={BW - 16} height={30} rx="3"
                  fill="white" fillOpacity="0.06"
                  stroke="white" strokeOpacity="0.15" strokeWidth="1" />
                <text x={CX[i]} y={DY + 20} textAnchor="middle" fontSize="10"
                  fill="white" fillOpacity="0.65" fontFamily="system-ui">
                  {step.deliverable}
                </text>
              </motion.g>
            ))}

            {/* Arrow: box 5 → END */}
            <polygon
              points={`${BX[4] + BW + 2},${MY-5} ${BX[4] + BW + 12},${MY} ${BX[4] + BW + 2},${MY+5}`}
              fill="white" fillOpacity="0.4"
            />

            {/* END pill */}
            <rect x={BX[4] + BW + 14} y={MY - 14} width="140" height="28" rx="14"
              fill="white" fillOpacity="0.09"
              stroke="white" strokeOpacity="0.35" strokeWidth="1" />
            <text x={BX[4] + BW + 84} y={MY + 5} textAnchor="middle" fontSize="9.5"
              fill="white" fontFamily="system-ui" letterSpacing="1">
              EMPRESA TRANSFORMADA
            </text>
          </svg>
        </motion.div>

        {/* ── MOBILE VERTICAL CARDS ── */}
        <div className="md:hidden space-y-0">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.12 * idx, duration: 0.6, ease: "easeOut" }}
              className="flex gap-5"
            >
              {/* Left: number + connector */}
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 border border-white/25 flex items-center justify-center shrink-0">
                  <span className="text-xs font-semibold text-white/50 tracking-widest">{step.number}</span>
                </div>
                {idx < steps.length - 1 && (
                  <div className="w-[1px] flex-1 bg-white/10 my-1" />
                )}
              </div>
              {/* Right: content */}
              <div className="pb-8 pt-1">
                <span className="text-white/35 text-[10px] uppercase tracking-widest font-semibold">{step.period}</span>
                <h3 className="font-serif text-xl text-white mt-1 mb-1">{step.title}</h3>
                <span className="inline-block text-[10px] uppercase tracking-wider text-white/50 border border-white/15 px-2 py-0.5 mb-3">{step.deliverable}</span>
                <p className="text-white/50 text-sm leading-relaxed font-light">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-14 pt-10 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6"
        >
          <p className="text-white/50 font-light text-sm text-center sm:text-left">
            O processo completo leva em média <span className="text-white font-medium">90 dias</span> — do diagnóstico à primeira grande virada de resultado.
          </p>
          <Button variant="outline" className="border-white/30 text-white hover:bg-white hover:text-primary shrink-0" asChild>
            <a href="#contato">Iniciar o processo <ArrowRight className="ml-2 h-4 w-4" /></a>
          </Button>
        </motion.div>

      </div>
    </section>
  );
}

function Methodology() {
  return (
    <section id="metodologia" className="py-24 md:py-32 bg-primary text-white">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-2 gap-20 items-center">
          <div>
            <span className="text-accent uppercase tracking-[0.2em] text-sm font-semibold block mb-4">Nosso Modo de Operar</span>
            <h2 className="text-4xl md:text-5xl font-serif mb-8">Discreção absoluta. <br/>Resultados evidentes.</h2>
            <p className="text-white/70 text-lg font-light leading-relaxed mb-10">
              Não entregamos relatórios teóricos que ficam na gaveta. Nossa metodologia é baseada em imersão profunda, diagnóstico baseado em dados reais e execução lado a lado com a diretoria.
            </p>
            <ul className="space-y-6">
              {[
                "Diagnóstico Preciso: Raio-x financeiro e operacional em 15 dias.",
                "Plano Tático: Ações de curto prazo para geração imediata de caixa.",
                "Execução Assistida: Acompanhamento quinzenal de KPIs e desvios.",
                "Transferência de Know-how: Treinamento da sua liderança."
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-4">
                  <div className="mt-1 h-1.5 w-1.5 bg-accent rounded-full shrink-0" />
                  <span className="text-white/90">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="bg-white/5 p-10 md:p-14 border border-white/10">
            <h3 className="text-3xl font-serif mb-8 text-center italic text-white/90">"O complexo deve se tornar simples para ser executável."</h3>
            <div className="h-[1px] w-16 bg-accent mx-auto mb-8" />
            <p className="text-center text-white/60 font-light text-sm uppercase tracking-widest">Princípio Akorp</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Clients() {
  const clients = [
    { name: "Cerâmica Ermida", sector: "Indústria Cerâmica" },
    { name: "Cinexpan", subtitle: "Indústria Argila Expandida", sector: "Indústria de Materiais" },
    { name: "CooperCapas", subtitle: "Confecções Automotivas", sector: "Setor Automotivo" },
    { name: "Engidraulica", subtitle: "Instalações e Montagens", sector: "Engenharia" },
    { name: "Modelar Construtora", sector: "Construção Civil" },
    { name: "Freire Engenharia", sector: "Engenharia" },
  ];

  return (
    <section id="clientes" className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={STAGGER}
          className="text-center mb-20"
        >
          <motion.div variants={FADE_UP} className="flex items-center justify-center gap-4 mb-6">
            <div className="h-[1px] w-12 bg-primary/30" />
            <span className="text-primary/50 uppercase tracking-[0.2em] text-xs font-semibold">Empresas Atendidas</span>
            <div className="h-[1px] w-12 bg-primary/30" />
          </motion.div>
          <motion.h2 variants={FADE_UP} className="text-4xl md:text-5xl font-serif text-primary mb-4">
            Nossos Principais Clientes
          </motion.h2>
          <motion.p variants={FADE_UP} className="text-muted-foreground max-w-xl mx-auto font-light text-lg">
            Empresas que confiam na AKORP para estruturar, crescer e operar com mais eficiência.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
          {clients.map((client, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: idx * 0.08, duration: 0.6, ease: "easeOut" }}
              className="bg-background group hover:bg-primary transition-colors duration-500 p-10 md:p-12 flex flex-col justify-between min-h-[160px]"
            >
              <div>
                <h3 className="text-xl md:text-2xl font-serif text-primary group-hover:text-white transition-colors duration-500 mb-1 leading-snug">
                  {client.name}
                </h3>
                {client.subtitle && (
                  <p className="text-sm text-muted-foreground group-hover:text-white/60 transition-colors duration-500 font-light">
                    {client.subtitle}
                  </p>
                )}
              </div>
              <span className="mt-6 text-xs uppercase tracking-widest text-muted-foreground/60 group-hover:text-white/40 transition-colors duration-500 font-medium">
                {client.sector}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contato" className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-6 md:px-12 max-w-5xl">
        <div className="bg-secondary p-10 md:p-20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full translate-x-1/2 -translate-y-1/2 blur-3xl" />
          
          <div className="relative z-10 grid md:grid-cols-2 gap-16">
            <div>
              <h2 className="text-4xl font-serif text-primary mb-6">Pronto para o próximo passo?</h2>
              <p className="text-muted-foreground mb-10 leading-relaxed">
                Agende uma conversa confidencial de 30 minutos com um de nossos sócios. Sem compromisso, apenas diagnóstico de alto nível.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4 text-primary">
                  <Mail className="h-5 w-5 text-accent" />
                  <a href="mailto:contato@akorp.com.br" className="font-medium hover:underline">contato@akorp.com.br</a>
                </div>
                <div className="flex items-center gap-4 text-primary">
                  <Phone className="h-5 w-5 text-accent" />
                  <a href="https://wa.me/5511989655754" target="_blank" rel="noopener noreferrer" className="font-medium hover:underline">WhatsApp (11) 98965-5754</a>
                </div>
                <div className="flex items-start gap-4 text-primary">
                  <Building2 className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                  <span className="font-medium">Rua Elizia Machado Benassi, 333, Sala 105A<br/>Cidade Nova Jardim — Jundiaí/SP</span>
                </div>
              </div>
            </div>
            
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-sm font-medium text-primary mb-2">Nome Completo</label>
                <input type="text" className="w-full h-12 bg-white border border-border px-4 focus:outline-none focus:border-accent transition-colors" />
              </div>
              <div>
                <label className="block text-sm font-medium text-primary mb-2">E-mail Corporativo</label>
                <input type="email" className="w-full h-12 bg-white border border-border px-4 focus:outline-none focus:border-accent transition-colors" />
              </div>
              <div>
                <label className="block text-sm font-medium text-primary mb-2">Empresa</label>
                <input type="text" className="w-full h-12 bg-white border border-border px-4 focus:outline-none focus:border-accent transition-colors" />
              </div>
              <Button type="submit" size="lg" className="w-full bg-primary hover:bg-primary/90 text-white rounded-none h-14 text-sm tracking-wider uppercase font-semibold">
                Solicitar Contato
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-primary text-white pt-20 pb-10">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2">
            <span className="font-serif text-2xl font-bold tracking-wider mb-2 block">AKORP</span>
            <span className="text-xs tracking-widest font-medium uppercase text-white/50 block mb-6">Gestão Empresarial</span>
            <p className="text-white/60 font-light max-w-sm leading-relaxed">
              Inteligência de gestão, estratégia e estruturação financeira para empresas que buscam crescimento sólido e previsibilidade.
            </p>
          </div>
          
          <div>
            <h4 className="font-serif text-lg mb-6">Navegação</h4>
            <ul className="space-y-4 text-sm text-white/60 font-light">
              <li><a href="#sobre" className="hover:text-accent transition-colors">Sobre Nós</a></li>
              <li><a href="#historia" className="hover:text-accent transition-colors">Nossa História</a></li>
              <li><a href="#consultor" className="hover:text-accent transition-colors">Consultor</a></li>
              <li><a href="#clientes" className="hover:text-accent transition-colors">Clientes</a></li>
              <li><a href="#especialidades" className="hover:text-accent transition-colors">Especialidades</a></li>
              <li><a href="#metodologia" className="hover:text-accent transition-colors">Metodologia</a></li>
              <li><a href="#contato" className="hover:text-accent transition-colors">Contato</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-serif text-lg mb-6">Legal</h4>
            <ul className="space-y-4 text-sm text-white/60 font-light">
              <li><a href="#" className="hover:text-accent transition-colors">Política de Privacidade</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Termos de Uso</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/40 font-light">
          <p>&copy; {new Date().getFullYear()} AKORP Gestão Empresarial. Todos os direitos reservados.</p>
          <p>São Paulo, Brasil</p>
        </div>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <About />
      <OurStory />
      <Consultant />
      <Services />
      <Process />
      <Methodology />
      <Clients />
      <Contact />
      <Footer />
    </div>
  );
}
