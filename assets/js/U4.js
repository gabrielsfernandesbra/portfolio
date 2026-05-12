async function buscar() {

  const dominio = document.getElementById("dominio").value.trim()
  const resultado = document.getElementById("resultado")

  try {

    if (!dominio) {
      throw new Error("Digite um domínio válido")
    }

    resultado.innerHTML = "Buscando domínio..."

    const response = await fetch(
      `https://rdap.org/domain/${dominio}`
    )

    if (!response.ok) {
      throw new Error("Domínio não encontrado")
    }

    const data = await response.json()

    const registro = data.events?.find(e => e.eventAction === "registration")?.eventDate
    const atualizado = data.events?.find(e => e.eventAction === "last changed")?.eventDate
    const expira = data.events?.find(e => e.eventAction === "expiration")?.eventDate

    resultado.innerHTML = `
      <h3>${data.ldhName || dominio}</h3>

      <p><strong>Registro:</strong> ${registro || "N/A"}</p>
      <p><strong>Última atualização:</strong> ${atualizado || "N/A"}</p>
      <p><strong>Expiração:</strong> ${expira || "N/A"}</p>

      <p><strong>DNS:</strong> ${data.nameservers?.map(n => n.ldhName).join(", ") || "N/A"
      }</p>
    `

  } catch (error) {

    resultado.innerHTML = `
      <p style="color:red;">${error.message}</p>
    `

    console.log(error)
  }
}