package br.edu.ifpr.bsi.sistemaclubesoft.repositories;

import br.edu.ifpr.bsi.sistemaclubesoft.model.estatisticas.Estatisticas;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EstatisticasRepository extends JpaRepository<Estatisticas, Long> {

    List<Estatisticas> findByGols(int gols);
}
