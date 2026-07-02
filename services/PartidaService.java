package br.edu.ifpr.bsi.sistemaclubesoft.services;

import br.edu.ifpr.bsi.sistemaclubesoft.Mapper.PartidaMapper;
import br.edu.ifpr.bsi.sistemaclubesoft.model.partida.Partida;
import br.edu.ifpr.bsi.sistemaclubesoft.model.partida.PartidaDetailDTO;
import br.edu.ifpr.bsi.sistemaclubesoft.model.partida.PartidaRequestDTO;
import br.edu.ifpr.bsi.sistemaclubesoft.repositories.PartidaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class PartidaService {

    @Autowired
    private PartidaRepository partidaRepository;

    @Autowired
    private PartidaMapper partidaMapper;

    public List<PartidaDetailDTO> listar(){
        return partidaRepository.findAll()
                .stream()
                .map(partidaMapper::entityToDetailDTO)
                .toList();
    }

    public PartidaDetailDTO salvar(PartidaRequestDTO request){
        Partida partida = partidaMapper.requestDTOToEntity(request);
        return partidaMapper.entityToDetailDTO(this.partidaRepository.save(partida));
    }

    @Transactional
    public PartidaDetailDTO atualizar(Long codigo, PartidaRequestDTO request){
        this.partidaRepository.findById(codigo).orElseThrow(() ->
                new ResponseStatusException(HttpStatus.NOT_FOUND, "Partida não encontrada"));

        Partida partida = partidaMapper.requestDTOToEntity(request);
        partida.setCodigo(codigo);
        return partidaMapper.entityToDetailDTO(this.partidaRepository.save(partida));
    }

    @Transactional
    public void excluir(Long codigo){
        Partida partidaExluir = this.partidaRepository.findById(codigo).orElseThrow(() ->
                new ResponseStatusException(HttpStatus.NOT_FOUND, "Partida não encontrada"));
        partidaRepository.delete(partidaExluir);
    }
}
