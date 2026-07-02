package br.edu.ifpr.bsi.sistemaclubesoft.model.escalacao;

public record EscalacaoRequestDTO(
        String esquemaTatico,
        String instrucoes,
        Long partidaCodigo
) {
}

