package br.edu.ifpr.bsi.sistemaclubesoft.model.lesao;

public record LesaoRequestDTO(String tipoLesao,
                            String gravidade,
                            String inicio,
                            String fim,
                              String previsaoRetorno,
                              String observacaoDP
) {
}
