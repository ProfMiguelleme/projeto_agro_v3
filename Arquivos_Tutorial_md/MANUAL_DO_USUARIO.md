# Manual do Usuário: AgroTech Connect CRUD

## 🎯 Bem-vindo ao AgroTech Connect!

Este manual mostra como usar todas as funcionalidades do sistema de gerenciamento de startups agrícolas.

---

## 🏠 Interface Principal

```
┌─────────────────────────────────────────────────────────┐
│  🌾 AgroTech Connect                                     │
│  Painel de Gerenciamento de Startups Agrícolas          │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│  ⚠️ ALERTAS (se houver erros)                           │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│  📝 Cadastrar Nova Startup                              │
│  ┌──────────────────────────────────────────────────┐   │
│  │ Nome: [                              ]           │   │
│  │ Especialidade: [                      ]          │   │
│  │ Ano de Abertura: [        ]                       │   │
│  │                              [Cadastrar Startup]  │   │
│  └──────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│  📊 Startups Disponíveis (5)        [🔄 Recarregar]    │
│  ┌────────────────────┐ ┌────────────────────┐         │
│  │ AgroFácil      2020│ │ EcoSolo        2021│         │
│  │ Drones             │ │ Sensores           │         │
│  │ Criado: 22/04/2026 │ │ Criado: 22/04/2026 │         │
│  │ [✏️ Editar][🗑️ Exc]│ │ [✏️ Editar][🗑️ Exc]│         │
│  └────────────────────┘ └────────────────────┘         │
│  ┌────────────────────┐ ┌────────────────────┐         │
│  │ AgriTech Pro   2022│ │ IrrigaControl  2019│         │
│  │ IA e Análise...    │ │ Sistemas de Irrig..│         │
│  │ Criado: 22/04/2026 │ │ Criado: 22/04/2026 │         │
│  │ [✏️ Editar][🗑️ Exc]│ │ [✏️ Editar][🗑️ Exc]│         │
│  └────────────────────┘ └────────────────────┘         │
│  ┌────────────────────┐                                 │
│  │ CropGuard      2023│                                 │
│  │ Proteção de Cult...│                                 │
│  │ Criado: 22/04/2026 │                                 │
│  │ [✏️ Editar][🗑️ Exc]│                                 │
│  └────────────────────┘                                 │
└─────────────────────────────────────────────────────────┘
```

---

## 📝 1. CRIAR NOVA STARTUP (CREATE)

### Passo a Passo

#### 1.1 Preencher o Formulário

```
Nome: [Minha AgriStartup]
Especialidade: [Sensores IoT]
Ano de Abertura: [2024]
```

#### 1.2 Validações

O sistema valida automaticamente:

- ✅ Nome é obrigatório
- ✅ Especialidade é obrigatória
- ✅ Ano é um número válido

Se algum campo estiver vazio:

```
┌──────────────────────────────────────────────┐
│ ❌ Nome e especialidade são obrigatórios     │
└──────────────────────────────────────────────┘
```

#### 1.3 Enviar Formulário

Clique em **"Cadastrar Startup"**

O botão muda para:
```
[Processando...]  ← desabilitado
```

#### 1.4 Confirmação de Sucesso

Se tudo correr bem, você vê:

```
┌──────────────────────────────────────────────┐
│ ✅ Startup criada com sucesso!               │
└──────────────────────────────────────────────┘
```

A mensagem desaparece depois de 3 segundos.

#### 1.5 Resultado

A nova startup aparece na grid abaixo com:
- Nome
- Ano de Abertura
- Especialidade
- Data de criação
- Botões Editar e Excluir

### Exemplo Real

```
Formulário:
├─ Nome: "ClimaGreen"
├─ Especialidade: "Análise de Clima"
└─ Ano: "2023"

↓

Sucesso! Startup aparece na grid:

┌────────────────────────┐
│ ClimaGreen        2023 │
│ Análise de Clima       │
│ Criado: 22/04/2026     │
│ [✏️ Editar][🗑️ Excluir]│
└────────────────────────┘
```

---

## 📖 2. LER/VISUALIZAR STARTUPS (READ)

### Ao Carregar a Página

Automaticamente todas as startups aparecem na grid com:

```
┌─────────────────────────────────┐
│ NOME DA STARTUP          ANO     │  ← Cabeçalho
├─────────────────────────────────┤
│ ESPECIALIDADE                   │  ← Corpo
│                                 │
│ Criado: 22/04/2026 (formatado)  │  ← Meta dados
├─────────────────────────────────┤
│ [✏️ Editar] [🗑️ Excluir]        │  ← Ações
└─────────────────────────────────┘
```

### Recarregar Lista Manual

Clique no botão **"🔄 Recarregar"** para:
- Buscar dados mais recentes do servidor
- Atualizar a exibição

Enquanto carrega:
```
[🔄 Recarregar]  ← desabilitado e carregando
```

### Grid Responsiva

A grid se adapta ao tamanho da tela:

```
Desktop (3 colunas):          Tablet (2 colunas):          Mobile (1 coluna):
┌──┐ ┌──┐ ┌──┐               ┌────┐ ┌────┐                ┌──────────┐
│  │ │  │ │  │               │    │ │    │                │          │
└──┘ └──┘ └──┘               │    │ │    │                │          │
                              └────┘ └────┘                └──────────┘
```

---

## ✏️ 3. EDITAR STARTUP (UPDATE)

### Passo a Passo

#### 3.1 Clique em "✏️ Editar"

Em qualquer card de startup:

```
Card antes:
┌──────────────────┐
│ AgroFácil   2020 │
│ Drones           │
│                  │
│ [✏️ Editar]←clique aqui
│ [🗑️ Excluir]     │
└──────────────────┘

Resultado: Modal abre
```

#### 3.2 Modal Aparece

```
╔═════════════════════════════════╗
║ Editar Startup              [×] ║
╟─────────────────────────────────╢
║ Nome: [AgroFácil           ]    ║
║ Especialidade: [Drones     ]    ║
║ Ano de Abertura: [2020    ]     ║
║                                 ║
║          [Atualizar Startup]    ║
╚═════════════════════════════════╝
```

#### 3.3 Modificar Dados

Altere os campos que deseja:

```
Antes:
Nome: [AgroFácil]
Especialidade: [Drones]

Depois:
Nome: [AgroFácil Pro]
Especialidade: [Drones Inteligentes]
```

#### 3.4 Enviar Alterações

Clique em **"Atualizar Startup"**

O botão fica desabilitado:
```
[Processando...]
```

#### 3.5 Confirmação

Se sucesso:

```
┌──────────────────────────────────┐
│ ✅ Startup atualizada com sucesso!│
└──────────────────────────────────┘

Modal fecha automaticamente
Grid atualiza com novos dados
```

#### 3.6 Visualizar Mudança

A startup na grid agora mostra os dados atualizados:

```
Antes:
┌──────────────────┐
│ AgroFácil   2020 │
│ Drones           │
└──────────────────┘

Depois:
┌──────────────────────────────┐
│ AgroFácil Pro            2020 │
│ Drones Inteligentes          │
└──────────────────────────────┘
```

### Fechar Modal Sem Salvar

Clique no **"×"** ou fora do modal:

```
╔═════════════════════════════════╗
║ Editar Startup              [×]←clique
╟─────────────────────────────────╢
║ Dados não salvos                ║
╚═════════════════════════════════╝

Modal fecha
Dados não são alterados
```

---

## 🗑️ 4. DELETAR STARTUP (DELETE)

### Passo a Passo

#### 4.1 Clique em "🗑️ Excluir"

Em qualquer card:

```
┌──────────────────┐
│ AgroFácil   2020 │
│ Drones           │
│                  │
│ [✏️ Editar]      │
│ [🗑️ Excluir]←clique
└──────────────────┘
```

#### 4.2 Confirmação Aparece

```
┌────────────────────────────────────┐
│ Tem certeza que deseja deletar      │
│ "AgroFácil"?                        │
│                                    │
│ [OK] [Cancelar]                    │
└────────────────────────────────────┘
```

#### 4.3 Confirmar Deleção

Clique em **"OK"**

#### 4.4 Sucesso

```
┌──────────────────────────────────┐
│ ✅ Startup deletada com sucesso!  │
└──────────────────────────────────┘

A startup desaparece imediatamente da grid
Contador de startups diminui em 1
```

#### 4.5 Cancelar Deleção

Clique em **"Cancelar"**

```
Deleção é cancelada
Startup continua na grid
Nada acontece
```

### Precauções

⚠️ **CUIDADO**: A deleção é permanente!

Sempre confirme se realmente deseja deletar a startup.

---

## ⚠️ 5. MENSAGENS DE ALERTA

### Sucesso ✅

```
┌──────────────────────────────────┐
│ ✅ Startup criada com sucesso!    │  ← Verde
└──────────────────────────────────┘

Aparece durante 3 segundos
Depois desaparece automaticamente
```

### Erro ❌

```
┌──────────────────────────────────┐
│ ⚠️ Erro ao carregar startups       │  ← Vermelho
│ Verifique se o servidor está      │
│ rodando.                          │
│ [×] Fechar                        │
└──────────────────────────────────┘

Clique em × para fechar
Não desaparece automaticamente
```

### Validação ⚠️

```
┌──────────────────────────────────┐
│ ❌ Nome e especialidade são       │
│ obrigatórios                      │  ← No formulário
└──────────────────────────────────┘

Aparece se campos estão vazios
Limpa quando você preenche
```

---

## 🔧 6. TROUBLESHOOTING

### Problema: "Erro ao carregar startups"

**Causa**: Servidor Express não está rodando

**Solução**:
1. Abra novo terminal
2. Execute: `npm run dev`
3. Espere mensagem: "🚀 Servidor rodando em http://localhost:3000"
4. Clique em "🔄 Recarregar" no frontend

### Problema: Frontend não carrega

**Causa**: Servidor Vite não está rodando

**Solução**:
1. Abra novo terminal
2. Execute: `cd frontend && npm run dev`
3. Acesse: http://localhost:5173

### Problema: Banco de dados vazio

**Causa**: Seeds não foram executados

**Solução**:
```bash
npx knex seed:run
```

Depois recarregue o frontend.

### Problema: Modal não fecha

**Causa**: Bug raro

**Solução**:
1. Clique fora do modal
2. Se não funcionar, recarregue a página (F5)

### Problema: Botão fica desabilitado

**Causa**: Requisição está processando

**Solução**:
- Espere alguns segundos
- Verificar console (F12) por erros
- Recarregue a página

---

## 💡 7. DICAS E BOAS PRÁTICAS

### Nomenclatura de Startups

Use nomes descritivos:

```
✅ Bom:
- AgroFácil Pro
- IoT Sensores Agrícolas
- ClimaGreen Intelligence

❌ Evitar:
- startup1
- abc
- xxx
```

### Especialidades Claras

Seja específico:

```
✅ Bom:
- Drones para Mapeamento
- Sensores IoT
- Análise de Solo
- IA e Machine Learning

❌ Evitar:
- Tecnologia
- Software
- Inovação
```

### Ano de Abertura

Use anos realistas:

```
✅ Válido: 1900 a 2099
❌ Inválido: 2200, 1800, letras
```

### Antes de Deletar

Sempre confirme:

```
⚠️ Deleção é permanente!
- Não pode ser desfeita
- Dados são perdidos do banco
- Certifique-se antes de confirmar
```

---

## 🎯 8. FLUXO COMPLETO - EXEMPLO

### Cenário: Cadastrar Nova Startup

**Situação**: Você quer cadastrar uma nova startup de drones

**Passo 1**: Preencher formulário
```
Nome: DroneAg Solutions
Especialidade: Drones para Agricultura
Ano de Abertura: 2023
```

**Passo 2**: Clicar em "Cadastrar Startup"

**Passo 3**: Aguardar processamento (2-3 segundos)

**Passo 4**: Ver mensagem de sucesso
```
✅ Startup criada com sucesso!
```

**Passo 5**: Novo card aparece na grid
```
┌──────────────────────────────┐
│ DroneAg Solutions       2023  │
│ Drones para Agricultura       │
│ Criado: 22/04/2026            │
│ [✏️ Editar] [🗑️ Excluir]     │
└──────────────────────────────┘
```

**Passo 6**: Editar se necessário
```
Clique em ✏️ Editar
→ Modal abre com dados
→ Altere "Drones para Agricultura" para "Drones e IA"
→ Clique em "Atualizar Startup"
→ Card atualiza automaticamente
```

**Passo 7**: Deletar se enganou
```
Clique em 🗑️ Excluir
→ Confirmação aparece
→ Clique OK
→ Card desaparece
→ Mensagem de sucesso
```

---

## 📞 9. SUPORTE E DOCUMENTAÇÃO

Para mais detalhes, consulte:

1. **FRONTEND_CRUD_TUTORIAL.md** - Tutorial técnico
2. **QUICK_START.md** - Guia rápido
3. **RESUMO_IMPLEMENTACAO.md** - Resumo técnico

---

## ✨ 10. RECURSOS VISUAIS

### Emojis Utilizados

| Emoji | Significado |
|-------|-------------|
| 🌾 | Tema agrícola |
| ✏️ | Editar |
| 🗑️ | Deletar/Lixo |
| 📝 | Formulário |
| 📊 | Estatísticas |
| 🔄 | Recarregar |
| ✅ | Sucesso |
| ❌ | Erro |
| ⚠️ | Aviso |
| 📖 | Documentação |

### Cores Visuais

```
Verde (#10b981)  - Botões, sucesso, primário
Vermelho (#ef4444) - Deletar, erro, perigo
Amarelo (#f59e0b) - Aviso, editar
Cinza (#6b7280) - Textos secundários, desabilitado
Branco (#ffffff) - Cartões, modais
Cinza claro (#f3f4f6) - Fundo
```

---

## 🎓 Conclusão

Você agora sabe como:

✅ Criar startups (CREATE)
✅ Ver startups (READ)
✅ Editar startups (UPDATE)
✅ Deletar startups (DELETE)
✅ Interpretar mensagens
✅ Resolver problemas comuns

**Bom uso do AgroTech Connect! 🌾**