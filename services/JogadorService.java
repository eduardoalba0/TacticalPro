package br.edu.ifpr.bsi.sistemaclubesoft.services;

import br.edu.ifpr.bsi.sistemaclubesoft.Mapper.JogadorMapper;
import br.edu.ifpr.bsi.sistemaclubesoft.model.jogador.Jogador;
import br.edu.ifpr.bsi.sistemaclubesoft.model.jogador.JogadorDetailDTO;
import br.edu.ifpr.bsi.sistemaclubesoft.model.jogador.JogadorRequestDTO;
import br.edu.ifpr.bsi.sistemaclubesoft.repositories.JogadorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class JogadorService {

    @Autowired
    private JogadorRepository jogadorRepository;

    @Autowired
    private JogadorMapper jogadorMapper;


    public List<JogadorDetailDTO> listar() {
        List<Jogador> clientes = jogadorRepository.findAll();
        return clientes.stream()
                .map(this::mapearDetalheComCodigo)
                .toList();
    }

    public JogadorDetailDTO salvar(JogadorRequestDTO request) {
        Jogador jogador = this.jogadorMapper.requestDTOToEntity(request);
        if (jogador.getLesoes() != null && !jogador.getLesoes().isEmpty()) {
            jogador.getLesoes().forEach(lesao -> lesao.setJogador(jogador));
        }
        Jogador salvo = this.jogadorRepository.save(jogador);
        return mapearDetalheComCodigo(salvo);
    }

    @Transactional
    public JogadorDetailDTO atualizar(Long codigo, JogadorRequestDTO request) {
        Jogador jogadorExistente = this.jogadorRepository.findById(codigo).orElseThrow(() ->
                new ResponseStatusException(HttpStatus.NOT_FOUND, "Jogador nao encontrado"));
        Jogador jogador = this.jogadorMapper.requestDTOToEntity(request);
        jogador.setCodigo(codigo);
        jogador.setUrlFotoJogador(jogadorExistente.getUrlFotoJogador());

        Jogador atualizado = this.jogadorRepository.save(jogador);
        return mapearDetalheComCodigo(atualizado);
    }

    @Transactional
    public void excluir(Long codigo){
        Jogador jogadorExcluir = this.jogadorRepository.findById(codigo).orElseThrow(() ->
                new ResponseStatusException(HttpStatus.NOT_FOUND, "Jogador nao encontrado"));
        jogadorRepository.delete(jogadorExcluir);
    }

    private JogadorDetailDTO mapearDetalheComCodigo(Jogador jogador) {
        JogadorDetailDTO detalheBase = this.jogadorMapper.entityToDetailDTO(jogador);
        return new JogadorDetailDTO(
                jogador.getCodigo(),
                detalheBase.nome(),
                detalheBase.dataNascimento(),
                detalheBase.numeroCamisa(),
                detalheBase.pesoKG(),
                detalheBase.alturaCM(),
                detalheBase.descricao(),
                detalheBase.disponivel(),
                detalheBase.pernaDominante(),
                detalheBase.posicao(),
                detalheBase.urlFotoJogador(),
                detalheBase.contrato(),
                detalheBase.lesoes()
        );
    }
}

