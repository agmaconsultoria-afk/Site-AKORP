import React, { useEffect, useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ChevronRight, ArrowRight, TrendingUp, ShieldCheck, Target, BarChart3, Menu, X, Building2, Briefcase, Mail, Phone, MapPin } from "lucide-react";
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
          {["Sobre", "Especialidades", "Metodologia", "Impacto"].map((item) => (
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
          {["Sobre", "Especialidades", "Metodologia", "Impacto"].map((item) => (
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
      
      <div className="container relative z-10 mx-auto px-6 md:px-12">
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
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-white rounded-none h-14 px-8 text-sm tracking-wider uppercase font-semibold" asChild>
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
                  <span className="font-medium">contato@akorp.com.br</span>
                </div>
                <div className="flex items-center gap-4 text-primary">
                  <Phone className="h-5 w-5 text-accent" />
                  <span className="font-medium">+55 11 3000-0000</span>
                </div>
                <div className="flex items-center gap-4 text-primary">
                  <Building2 className="h-5 w-5 text-accent" />
                  <span className="font-medium">Av. Faria Lima, São Paulo - SP</span>
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
      <Services />
      <Methodology />
      <Contact />
      <Footer />
    </div>
  );
}
