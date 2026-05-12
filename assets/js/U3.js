async function buscar() {

  const resultado = document.getElementById("resultado")

  const cep = document
    .getElementById("cep")
    .value
    .replace(/\D/g, "")

  try {

    if (!cep || cep.length !== 8) {
      throw new Error("CEP inválido")
    }

    resultado.innerHTML = "<p>Buscando CEP...</p>"

    const response = await fetch(
      `https://brasilapi.com.br/api/cep/v1/${cep}`
    )

    if (!response.ok) {
      throw new Error("CEP não encontrado")
    }

    const data = await response.json()

    resultado.innerHTML = `
      <h3>Endereço encontrado</h3>

      <p><strong>Rua:</strong> ${data.street || "N/A"}</p>

      <p><strong>Bairro:</strong> ${data.neighborhood || "N/A"}</p>

      <p><strong>Cidade:</strong> ${data.city}</p>

      <p><strong>Estado:</strong> ${data.state}</p>
    `

  } catch (error) {

    resultado.innerHTML = `
      <p style="color:red;">${error.message}</p>
    `

    console.log("Erro CEP:", error)
  }
}