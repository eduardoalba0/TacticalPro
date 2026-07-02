package br.edu.ifpr.bsi.sistemaclubesoft.model.treino;

public record TreinoDetailDTO(
        Long codigo,
        String focoTatico,
        String intensidade,
        String clima,
        String descricao
) {
}

