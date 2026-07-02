package br.edu.ifpr.bsi.sistemaclubesoft.repositories;

import br.edu.ifpr.bsi.sistemaclubesoft.model.jogador.Jogador;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JogadorRepository extends JpaRepository<Jogador, Long> {

    List<Jogador> findByNome(String nome);

    @Query(value="SELECT j FROM Jogador j WHERE j.nome LIKE %:nome%")
    List<Jogador> getAllByNomeLike(@Param("nome") String nome);

}
