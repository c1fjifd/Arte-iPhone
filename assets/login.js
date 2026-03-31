import { supabase } from './supabase.js'

const form = document.getElementById('login-form')
const email = document.getElementById('email')
const senha = document.getElementById('senha')
const btnLogin = document.getElementById('btn-login')
const erroBox = document.getElementById('login-erro')

function mostrarErro(mensagem) {
  erroBox.textContent = mensagem
  erroBox.classList.remove('hidden')
}

function limparErro() {
  erroBox.textContent = ''
  erroBox.classList.add('hidden')
}

async function verificarSessao() {
  const { data, error } = await supabase.auth.getSession()

  if (!error && data.session) {
    window.location.href = 'admin.html'
  }
}

form.addEventListener('submit', async (event) => {
  event.preventDefault()
  limparErro()

  const emailValor = email.value.trim()
  const senhaValor = senha.value.trim()

  if (!emailValor) {
    mostrarErro('Preencha o e-mail.')
    email.focus()
    return
  }

  if (!senhaValor) {
    mostrarErro('Preencha a senha.')
    senha.focus()
    return
  }

  const textoOriginal = btnLogin.textContent

  try {
    btnLogin.disabled = true
    btnLogin.textContent = 'Entrando...'

    const { error } = await supabase.auth.signInWithPassword({
      email: emailValor,
      password: senhaValor
    })

    if (error) {
      mostrarErro('E-mail ou senha inválidos.')
      return
    }

    window.location.href = 'admin.html'
  } catch (error) {
    console.error(error)
    mostrarErro('Não foi possível fazer login agora.')
  } finally {
    btnLogin.disabled = false
    btnLogin.textContent = textoOriginal
  }
})

verificarSessao()
