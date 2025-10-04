import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { Card, CardContent } from '../components/ui/card'
import { ArrowRight, Leaf, Recycle, Heart, Star, Sparkles } from 'lucide-react'
import ProductCard from '../components/ProductCard'

const Home = () => {
  console.log('Home page rendered with minimal animations')
  
  const heroRef = useRef<HTMLImageElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate')
          }
        })
      },
      { threshold: 0.1 }
    )

    // Observe all elements with animate-on-scroll class
    const animateElements = document.querySelectorAll('.animate-on-scroll')
    animateElements.forEach((el) => observer.observe(el))

    // Subtle parallax effect for hero background
    const handleScroll = () => {
      const scrolled = window.pageYOffset
      const parallax = heroRef.current
      if (parallax) {
        const speed = scrolled * 0.3
        parallax.style.transform = `translateY(${speed}px)`
      }
    }

    window.addEventListener('scroll', handleScroll)

    // Stats counter animation
    const animateStats = () => {
      const statsElements = statsRef.current?.querySelectorAll('.stat-number')
      if (statsElements) {
        statsElements.forEach((stat, index) => {
          const target = parseInt(stat.getAttribute('data-target') || '0')
          const increment = target / 80
          let current = 0
          
          const timer = setInterval(() => {
            current += increment
            if (current >= target) {
              stat.textContent = target.toString()
              clearInterval(timer)
            } else {
              stat.textContent = Math.ceil(current).toString()
            }
          }, 25 + index * 5)
        })
      }
    }

    const statsObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateStats()
            statsObserver.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.5 }
    )

    if (statsRef.current) {
      statsObserver.observe(statsRef.current)
    }

    return () => {
      observer.disconnect()
      statsObserver.disconnect()
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const highlights = [
    {
      icon: <Leaf className="h-7 w-7 text-primary animate-float" />,
      title: "100% Sustentável",
      description: "Produtos ecológicos que fazem a diferença"
    },
    {
      icon: <Recycle className="h-7 w-7 text-primary animate-float-delayed" />,
      title: "Reutilizável",
      description: "Durabilidade e qualidade em cada produto"
    },
    {
      icon: <Heart className="h-7 w-7 text-primary animate-gentle-bounce" />,
      title: "Feito com Amor",
      description: "Cada peça é única e artesanal"
    }
  ]

  // Produtos em destaque - mix de diferentes categorias
  const featuredProducts = [
    {
      id: 1,
      name: "EcoBag 'Mar Doce Lar'",
      category: "EcoBags",
      images: [
        {
          url: "https://cdn-ai.onspace.ai/onspace/project/image/XeQ2YWQvTtREiHW8mDN79N/Imagem_do_WhatsApp_de_2025-09-30_à(s)_01.44.29_18aae992.jpg",
          alt: "EcoBag Mar Doce Lar - Vista frontal"
        },
        {
          url: "https://cdn-ai.onspace.ai/onspace/project/image/mUHwvvXqSHptCB4uvaVZc8/Imagem_do_WhatsApp_de_2025-09-30_à(s)_01.44.29_18aae992.jpg",
          alt: "EcoBag Mar Doce Lar - Vista pendurada"
        }
      ],
      description: "Design inspirado no mar com tipografia criativa"
    },
    {
      id: 6,
      name: "Cinzeiro Universo Místico",
      category: "Cinzeiros",
      images: [
        {
          url: "https://cdn-ai.onspace.ai/onspace/project/image/XoNWXGKFovkBZWDxR2zUFV/Imagem_do_WhatsApp_de_2025-09-30_à(s)_01.44.27_17d633eb.jpg",
          alt: "Cinzeiro Universo Místico - Vista superior"
        },
        {
          url: "https://cdn-ai.onspace.ai/onspace/project/image/B3ujeDNDD66Eh9ykSQVcKB/Imagem_do_WhatsApp_de_2025-09-30_à(s)_01.44.27_17d633eb.jpg",
          alt: "Cinzeiro Universo Místico - Vista na mão"
        }
      ],
      description: "Design cósmico com olho central e estrelas"
    },
    {
      id: 15,
      name: "Mini Tela Cósmica",
      category: "Mini Telas",
      images: [
        {
          url: "https://cdn-ai.onspace.ai/onspace/project/image/9pko3fbvc927PViDX539mT/Imagem_do_WhatsApp_de_2025-09-30_à(s)_01.44.29_a9e29dbc.jpg",
          alt: "Mini Tela Cósmica - Vista superior"
        },
        {
          url: "https://cdn-ai.onspace.ai/onspace/project/image/Q2XL2GHwhRAHQNreRvtswn/Imagem_do_WhatsApp_de_2025-09-30_à(s)_01.44.29_a9e29dbc.jpg",
          alt: "Mini Tela Cósmica - Vista na mão"
        }
      ],
      description: "Universo em miniatura com olho central"
    },
    {
      id: 2,
      name: "EcoBag Lana Del Rey",
      category: "EcoBags",
      images: [
        {
          url: "https://cdn-ai.onspace.ai/onspace/project/image/MjCgbX9iiN5zM37BGqs352/Imagem_do_WhatsApp_de_2025-09-30_à(s)_01.44.30_c32269da.jpg",
          alt: "EcoBag Lana Del Rey - Vista frontal"
        },
        {
          url: "https://cdn-ai.onspace.ai/onspace/project/image/gG2HHSLCDoxm2rscH6Viv3/Imagem_do_WhatsApp_de_2025-09-30_à(s)_01.44.30_c32269da.jpg",
          alt: "EcoBag Lana Del Rey - Post Instagram"
        }
      ],
      description: "Inspirada na música, com cerejas delicadas"
    },
    {
      id: 10,
      name: "Cinzeiro Batman",
      category: "Cinzeiros",
      images: [
        {
          url: "https://cdn-ai.onspace.ai/onspace/project/image/4tPTXouZuiDxWYgUSZUHBt/Imagem_do_WhatsApp_de_2025-09-30_à(s)_01.44.28_59c8ca00.jpg",
          alt: "Cinzeiro Batman - Vista superior"
        },
        {
          url: "https://cdn-ai.onspace.ai/onspace/project/image/MHVxus6JuzzhguBTpXZxhL/Imagem_do_WhatsApp_de_2025-09-30_à(s)_01.44.28_59c8ca00.jpg",
          alt: "Cinzeiro Batman - Vista na mão"
        }
      ],
      description: "Logo clássico do Batman em amarelo"
    },
    {
      id: 16,
      name: "Mini Tela Espiral Colorida",
      category: "Mini Telas",
      images: [
        {
          url: "https://cdn-ai.onspace.ai/onspace/project/image/GEvjzk6rDK5Jkf4D3Rc9FE/Imagem_do_WhatsApp_de_2025-09-30_à(s)_01.44.29_de2e1d21.jpg",
          alt: "Mini Tela Espiral - Vista superior"
        },
        {
          url: "https://cdn-ai.onspace.ai/onspace/project/image/fR3xrSSQeWwUjGNSUxsDc4/Imagem_do_WhatsApp_de_2025-09-30_à(s)_01.44.29_de2e1d21.jpg",
          alt: "Mini Tela Espiral - Vista alternativa"
        }
      ],
      description: "Espiral hipnótica em tons vibrantes"
    }
  ]

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Hero Section with Minimal Animations */}
      <section className="relative overflow-hidden eco-gradient min-h-screen flex items-center">
        {/* Subtle Background Elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-20 w-24 h-24 bg-white/10 rounded-full animate-float"></div>
          <div className="absolute top-1/3 right-24 w-16 h-16 bg-white/10 rounded-full animate-float-delayed"></div>
          <div className="absolute bottom-32 left-1/4 w-12 h-12 bg-white/10 rounded-full animate-gentle-bounce"></div>
        </div>

        <div className="container px-4 py-16 md:py-24 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-white space-y-6 animate-fade-in-left">
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                <span className="inline-block">EcoBags</span>
                <br />
                <span className="text-white/90 inline-block animate-fade-in-up" style={{animationDelay: '0.2s'}}>Personalizadas</span>
              </h1>
              
              <p className="text-xl text-white/90 max-w-lg animate-fade-in-up" style={{animationDelay: '0.4s'}}>
                Transforme sua rotina com produtos sustentáveis únicos. 
                EcoBags, cinzeiros artesanais, chaveiros e mini telas criativas.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up" style={{animationDelay: '0.6s'}}>
                <Button asChild size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90 btn-smooth">
                  <Link to="/loja">
                    <Sparkles className="mr-2 h-4 w-4" />
                    Ver Produtos
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-white text-white bg-transparent hover:bg-white/10 btn-smooth">
                  <Link to="/contato">
                    Fale Conosco
                  </Link>
                </Button>
              </div>
            </div>
            
            <div className="relative animate-fade-in-right">
              <div className="aspect-square rounded-2xl overflow-hidden glass-subtle hover-subtle relative group">
                <img 
                  ref={heroRef}
                  src="https://cdn-ai.onspace.ai/onspace/project/image/PWUMbMsJm3zfhVCEzPsZ6o/logo.png"
                  alt="ECOFLY Logo"
                  className="w-full h-full object-contain p-8 transition-transform duration-500 group-hover:scale-105 parallax"
                />
                
                {/* Decorative elements */}
                <div className="absolute -top-4 -right-4 w-16 h-16 bg-white/10 rounded-full blur-xl animate-float"></div>
                <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-white/5 rounded-full blur-2xl animate-float-delayed"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section with Staggered Animation */}
      <section className="py-16 md:py-24 animate-on-scroll">
        <div className="container px-4">
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 eco-text-gradient">
              Por que escolher a ECOFLY?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Mais que produtos, oferecemos uma experiência sustentável única
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 stagger-children">
            {highlights.map((highlight, index) => (
              <Card key={index} className="border-none shadow-md hover-subtle glass-subtle group">
                <CardContent className="p-8 text-center space-y-4">
                  <div className="flex justify-center">{highlight.icon}</div>
                  <h3 className="text-xl font-semibold">{highlight.title}</h3>
                  <p className="text-muted-foreground">{highlight.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Products Preview */}
      <section className="py-16 md:py-24 bg-muted/30 animate-on-scroll">
        <div className="container px-4">
          <div className="text-center mb-12 animate-scale-in">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Produtos em Destaque
            </h2>
            <p className="text-xl text-muted-foreground">
              Explore nossa variedade de produtos únicos e sustentáveis
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12 stagger-children">
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                category={product.category}
                images={product.images}
                description={product.description}
              />
            ))}
          </div>

          <div className="text-center animate-scale-in">
            <Button asChild size="lg" className="eco-gradient text-white btn-smooth">
              <Link to="/loja">
                Ver Todos os Produtos
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Sustainability Section */}
      <section className="py-16 md:py-24 animate-on-scroll">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="eco-gradient rounded-2xl p-8 md:p-12 text-white relative overflow-hidden">
              {/* Subtle decorative elements */}
              <div className="absolute top-4 right-4 w-16 h-16 bg-white/5 rounded-full animate-float-delayed"></div>
              <div className="absolute bottom-4 left-4 w-12 h-12 bg-white/5 rounded-full animate-gentle-bounce"></div>
              
              <Leaf className="h-12 w-12 mx-auto mb-6 opacity-80 animate-float" />
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Sustentabilidade em Cada Detalhe
              </h2>
              <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
                Na ECOFLY, cada produto é pensado para minimizar o impacto ambiental. 
                Usamos materiais sustentáveis e processos artesanais que respeitam o planeta.
              </p>
              
              <div ref={statsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div className="animate-scale-in">
                  <div className="text-3xl font-bold mb-2">
                    <span className="stat-number" data-target="100">0</span>%
                  </div>
                  <div className="opacity-90">Materiais Sustentáveis</div>
                </div>
                <div className="animate-scale-in" style={{animationDelay: '0.2s'}}>
                  <div className="text-3xl font-bold mb-2">
                    <span className="stat-number" data-target="0">0</span>%
                  </div>
                  <div className="opacity-90">Desperdício</div>
                </div>
                <div className="animate-scale-in" style={{animationDelay: '0.4s'}}>
                  <div className="text-3xl font-bold mb-2">∞</div>
                  <div className="opacity-90">Reutilização</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home