package br.edu.ifpr.bsi.sistemaclubesoft.model.escalacao;

public record EscalacaoDetailDTO(
        Long codigo,
        String esquemaTatico,
        String instrucoes,
        Long partidaCodigo
) {
}

