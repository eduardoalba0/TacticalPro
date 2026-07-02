package br.edu.ifpr.bsi.sistemaclubesoft.services;

import br.edu.ifpr.bsi.sistemaclubesoft.Mapper.EstatisticasMapper;
import br.edu.ifpr.bsi.sistemaclubesoft.model.estatisticas.Estatisticas;
import br.edu.ifpr.bsi.sistemaclubesoft.model.estatisticas.EstatisticasDetailDTO;
import br.edu.ifpr.bsi.sistemaclubesoft.model.estatisticas.EstatisticasRequestDTO;
import br.edu.ifpr.bsi.sistemaclubesoft.model.jogador.Jogador;
import br.edu.ifpr.bsi.sistemaclubesoft.repositories.EstatisticasRepository;
import br.edu.ifpr.bsi.sistemaclubesoft.repositories.JogadorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class EstatisticasService {

    @Autowired
    private EstatisticasRepository estatisticasRepository;

    @Autowired
    private JogadorRepository jogadorRepository;

    @Autowired
    private EstatisticasMapper estatisticasMapper;

    public List<EstatisticasDetailDTO> listar(){
        return estatisticasRepository.findAll()
                .stream()
                .map(this::mapearDetalheComCodigo)
                .toList();
    }

    public EstatisticasDetailDTO salvar(EstatisticasRequestDTO request){
        Estatisticas estatisticas = estatisticasMapper.requestDTOToEntity(request);
        estatisticas.setJogador(obterJogadorExistente(request));
        Estatisticas salva = this.estatisticasRepository.save(estatisticas);
        return mapearDetalheComCodigo(salva);
    }

    @Transactional
    public EstatisticasDetailDTO atualizar(Long codigo, EstatisticasRequestDTO request){
        this.estatisticasRepository.findById(codigo).orElseThrow(() ->
                new ResponseStatusException(HttpStatus.NOT_FOUND, "Estatisticas nao encontradas"));

        Estatisticas estatisticas = estatisticasMapper.requestDTOToEntity(request);
        estatisticas.setCodigo(codigo);
        estatisticas.setJogador(obterJogadorExistente(request));
        Estatisticas atualizada = this.estatisticasRepository.save(estatisticas);
        return mapearDetalheComCodigo(atualizada);
    }

    @Transactional
    public void excluir(Long codigo){
        Estatisticas estatisticasExcluir = this.estatisticasRepository.findById(codigo).orElseThrow(() ->
                new ResponseStatusException(HttpStatus.NOT_FOUND, "Estatisticas nao encontradas"));
        estatisticasRepository.delete(estatisticasExcluir);
    }

    private Jogador obterJogadorExistente(EstatisticasRequestDTO request) {
        Long codigoJogador = request != null && request.jogador() != null ? request.jogador().codigo() : null;
        if (codigoJogador == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Codigo do jogador e obrigatorio para registrar estatisticas");
        }

        return jogadorRepository.findById(codigoJogador)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Jogador nao encontrado"));
    }

    private EstatisticasDetailDTO mapearDetalheComCodigo(Estatisticas estatisticas) {
        EstatisticasDetailDTO detalheBase = estatisticasMapper.entityToDetailDTO(estatisticas);
        return new EstatisticasDetailDTO(
                estatisticas.getCodigo(),
                detalheBase.gols(),
                detalheBase.assistencias(),
                detalheBase.passes(),
                detalheBase.jogos(),
                detalheBase.minutosJogados(),
                detalheBase.desarmes(),
                detalheBase.cartoesAmarelos(),
                detalheBase.cartoesVermelhos(),
                detalheBase.faltasJogador(),
                detalheBase.jogador()
        );
    }
}