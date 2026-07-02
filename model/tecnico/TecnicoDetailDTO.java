package br.edu.ifpr.bsi.sistemaclubesoft.model.tecnico;

public record TecnicoDetailDTO(long codigo,
                               String nome,
                               String cpf,
                               String email,
                               String dataNascimento,
                               String senha
) {
}
