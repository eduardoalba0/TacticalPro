package br.edu.ifpr.bsi.sistemaclubesoft.services;

import br.edu.ifpr.bsi.sistemaclubesoft.Mapper.TorneioMapper;
import br.edu.ifpr.bsi.sistemaclubesoft.model.torneio.Torneio;
import br.edu.ifpr.bsi.sistemaclubesoft.model.torneio.TorneioDetailDTO;
import br.edu.ifpr.bsi.sistemaclubesoft.model.torneio.TorneioRequestDTO;
import br.edu.ifpr.bsi.sistemaclubesoft.repositories.TorneioRepository;
import jakarta.annotation.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class TorneioService {

    @Resource
    private TorneioRepository torneioRepository;

    @Resource
    private TorneioMapper torneioMapper;

    public List<TorneioDetailDTO> listar(){
        return torneioRepository.findAll()
                .stream()
                .map(torneioMapper::entityToDetailDTO)
                .toList();
    }

    public TorneioDetailDTO salvar(TorneioRequestDTO request){
        Torneio torneio = torneioMapper.requestDTOToEntity(request);
        return torneioMapper.entityToDetailDTO(this.torneioRepository.save(torneio));
    }

    @Transactional
    public TorneioDetailDTO atualizar(Long codigo, TorneioRequestDTO request){
        this.torneioRepository.findById(codigo).orElseThrow(() ->
                new ResponseStatusException(HttpStatus.NOT_FOUND, "Torneio não encontrado"));

        Torneio torneio = torneioMapper.requestDTOToEntity(request);
        torneio.setCodigo(codigo);
        return torneioMapper.entityToDetailDTO(this.torneioRepository.save(torneio));
    }

    @Transactional
    public void excluir(Long codigo){
        Torneio torneioExcluir = this.torneioRepository.findById(codigo).orElseThrow(() ->
                new ResponseStatusException(HttpStatus.NOT_FOUND, "Torneio não encontrado"));
        torneioRepository.delete(torneioExcluir);
    }
}
