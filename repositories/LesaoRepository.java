package br.edu.ifpr.bsi.sistemaclubesoft.repositories;

import br.edu.ifpr.bsi.sistemaclubesoft.model.lesao.Lesao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LesaoRepository extends JpaRepository<Lesao, Long> {
    List<Lesao> findByTipoLesao(String tipoLesao);
}
