import React, { useState } from 'react'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Input } from '../components/ui/input'
import { Textarea } from '../components/ui/textarea'
import { Label } from '../components/ui/label'
import { Star, Send, User, MessageSquare, Clock, Award } from 'lucide-react'
import { toast } from 'sonner'
import { useFeedback } from '../hooks/useFeedback'

const Feedback = () => {
  console.log('Feedback page rendered')

  const [rating, setRating] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    product: '',
    message: ''
  })

  const { addFeedback, getRecentFeedbacks, feedbacksCount } = useFeedback()
  const recentFeedbacks = getRecentFeedbacks(5)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Feedback submitted:', { ...formData, rating })
    
    if (!formData.name || !formData.message) {
      toast.error('Por favor, preencha pelo menos seu nome e mensagem.')
      return
    }

    if (rating === 0) {
      toast.error('Por favor, dê uma avaliação com estrelas.')
      return
    }

    // Adicionar feedback usando o hook
    const feedbackId = addFeedback({
      name: formData.name,
      email: formData.email,
      product: formData.product,
      message: formData.message,
      rating: rating
    })

    console.log('Feedback adicionado com ID:', feedbackId)
    toast.success('Obrigado pelo seu feedback! Sua opinião é muito importante para nós.')
    
    // Reset form
    setFormData({ name: '', email: '', product: '', message: '' })
    setRating(0)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const getRatingText = (stars: number) => {
    switch (stars) {
      case 1: return 'Muito Ruim'
      case 2: return 'Ruim'
      case 3: return 'Regular'
      case 4: return 'Bom'
      case 5: return 'Excelente'
      default: return ''
    }
  }

  return (
    <div className="container px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 eco-text-gradient">
          Sua Opinião Importa
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Compartilhe sua experiência conosco e ajude outros clientes a conhecer nossos produtos
        </p>
        {feedbacksCount > 0 && (
          <div className="flex items-center justify-center gap-2 mt-4">
            <Award className="h-5 w-5 text-primary" />
            <span className="text-sm text-muted-foreground">
              {feedbacksCount} {feedbacksCount === 1 ? 'avaliação recebida' : 'avaliações recebidas'}
            </span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Feedback Form */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-primary" />
              Deixe seu Feedback
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Rating */}
              <div className="space-y-3">
                <Label>Avaliação *</Label>
                <div className="flex items-center gap-3">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-8 w-8 cursor-pointer transition-all duration-200 ${
                          star <= (hoveredRating || rating)
                            ? 'fill-yellow-400 text-yellow-400 scale-110'
                            : 'text-gray-300 hover:text-yellow-200'
                        }`}
                        onMouseEnter={() => setHoveredRating(star)}
                        onMouseLeave={() => setHoveredRating(0)}
                        onClick={() => setRating(star)}
                      />
                    ))}
                  </div>
                  {(hoveredRating || rating) > 0 && (
                    <span className="text-sm text-muted-foreground animate-fade-in-left">
                      {getRatingText(hoveredRating || rating)}
                    </span>
                  )}
                </div>
              </div>

              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="name">Nome *</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Seu nome"
                  required
                  className="transition-all duration-200 focus:scale-[1.02]"
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Email (opcional)</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="seu@email.com"
                  className="transition-all duration-200 focus:scale-[1.02]"
                />
              </div>

              {/* Product */}
              <div className="space-y-2">
                <Label htmlFor="product">Produto (opcional)</Label>
                <Input
                  id="product"
                  name="product"
                  value={formData.product}
                  onChange={handleInputChange}
                  placeholder="Qual produto você adquiriu?"
                  className="transition-all duration-200 focus:scale-[1.02]"
                />
              </div>

              {/* Message */}
              <div className="space-y-2">
                <Label htmlFor="message">Sua experiência *</Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Conte-nos sobre sua experiência com nossos produtos..."
                  rows={4}
                  required
                  className="transition-all duration-200 focus:scale-[1.02] resize-none"
                />
              </div>

              <Button type="submit" className="w-full eco-gradient text-white hover-scale">
                <Send className="w-4 h-4 mr-2" />
                Enviar Feedback
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Recent Feedbacks */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Feedbacks Recentes</h2>
            {feedbacksCount > 0 && (
              <div className="text-sm text-muted-foreground">
                {feedbacksCount} total
              </div>
            )}
          </div>
          
          {recentFeedbacks.length === 0 ? (
            <Card className="shadow-md">
              <CardContent className="p-8 text-center">
                <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Nenhum feedback ainda</h3>
                <p className="text-muted-foreground">
                  Seja o primeiro a deixar sua avaliação!
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4 max-h-[600px] overflow-y-auto">
              {recentFeedbacks.map((feedback, index) => (
                <Card 
                  key={feedback.id} 
                  className="shadow-md hover:shadow-lg transition-all duration-300 animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 flex-shrink-0">
                        <User className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1 space-y-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-semibold text-lg">{feedback.name}</h3>
                            {feedback.product && (
                              <p className="text-sm text-muted-foreground">
                                Produto: {feedback.product}
                              </p>
                            )}
                          </div>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            {feedback.date}
                          </div>
                        </div>
                        
                        <div className="flex gap-1">
                          {[...Array(feedback.rating)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          ))}
                          {[...Array(5 - feedback.rating)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 text-gray-300" />
                          ))}
                          <span className="ml-2 text-sm font-medium">
                            {getRatingText(feedback.rating)}
                          </span>
                        </div>
                        
                        <p className="text-sm leading-relaxed bg-muted/30 p-3 rounded-lg">
                          "{feedback.message}"
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Call to Action */}
          <Card className="eco-gradient text-white">
            <CardContent className="p-6 text-center">
              <h3 className="text-lg font-semibold mb-2">Satisfação Garantida</h3>
              <p className="text-sm opacity-90 mb-4">
                Nossa prioridade é sua satisfação. Cada produto é feito com carinho e atenção aos detalhes.
              </p>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold">100%</div>
                  <div className="text-xs opacity-90">Artesanal</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">♻️</div>
                  <div className="text-xs opacity-90">Sustentável</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">💚</div>
                  <div className="text-xs opacity-90">Com Amor</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Feedback