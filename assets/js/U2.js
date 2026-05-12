async function buscar() {

  const resultado = document.getElementById("resultado")
  const cnpj = document.getElementById("cnpj").value

  try {

    if (!cnpj || cnpj.length < 14) {
      throw new Error("CNPJ inválido")
    }

    resultado.innerHTML = "<p>Buscando CNPJ...</p>"

    const response = await fetch(
      `https://brasilapi.com.br/api/cnpj/v1/${cnpj}`
    )

    if (!response.ok) {
      throw new Error("CNPJ não encontrado")
    }

    const data = await response.json()

    resultado.innerHTML = `
      <h2>${data.razao_social || "N/A"}</h2>

      <p><strong>CNPJ:</strong> ${data.cnpj}</p>
      <p><strong>Nome fantasia:</strong> ${data.nome_fantasia || "N/A"}</p>
      <p><strong>Situação:</strong> ${data.descricao_situacao_cadastral || "N/A"}</p>
      <p><strong>Porte:</strong> ${data.porte || "N/A"}</p>
      <p><strong>Natureza jurídica:</strong> ${data.natureza_juridica || "N/A"}</p>
      <p><strong>Capital social:</strong> ${data.capital_social || "N/A"}</p>

      <p><strong>Endereço:</strong>
        ${data.logradouro || ""}, ${data.numero || ""}
        ${data.complemento || ""}
        - ${data.bairro || ""}
        - ${data.municipio || ""}/${data.uf || ""}
        - ${data.cep || ""}
      </p>

      <p><strong>Atividade:</strong> ${data.cnae_fiscal || ""} - ${data.cnae_fiscal_descricao || "N/A"}</p>

      <p><strong>Contato:</strong> ${data.ddd_telefone_1 || "N/A"} / ${data.email || "N/A"}</p>

      <p><strong>Sócios:</strong></p>

      ${data.qsa && data.qsa.length > 0
        ? data.qsa.map(socio => `
              <p>
                ${socio.nome_socio || "N/A"} -
                ${socio.qualificacao_socio || "N/A"} -
                ${socio.faixa_etaria || "N/A"}
              </p>
            `).join("")
        : "<p>Nenhum sócio encontrado</p>"
      }
    `

  } catch (error) {

    resultado.innerHTML = `
      <p style="color:red;">${error.message}</p>
    `

    console.log(error)
  }
}