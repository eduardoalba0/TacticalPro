package br.edu.ifpr.bsi.sistemaclubesoft.repositories;

import br.edu.ifpr.bsi.sistemaclubesoft.model.jogador.Jogador;
import br.edu.ifpr.bsi.sistemaclubesoft.model.torneio.Torneio;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TorneioRepository extends JpaRepository<Torneio,Long> {

    List<Torneio> findByNome(String nome);

    @Query(value="SELECT j FROM Torneio j WHERE j.nome LIKE %:nome%")
    List<Jogador> getAllByNomeLike(@Param("nome") String nome);
}
