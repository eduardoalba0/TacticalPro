package br.edu.ifpr.bsi.sistemaclubesoft.model.jogador;

public record JogadorSummaryDTO(String nome,
                                String dataNascimento,
                                String numeroCamisa,
                                float pesoKG,
                                int alturaCM,
                                String descricao,
                                String disponivel,
                                String pernaDominante,
                                String posicao,
                                String urlFotoJogador
) {
}
