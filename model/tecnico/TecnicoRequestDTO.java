package br.edu.ifpr.bsi.sistemaclubesoft.model.tecnico;

public record TecnicoRequestDTO(long codigo,
                                String nome,
                                String cpf,
                                String email,
                                String dataNascimento,
                                String senha

) {
}
