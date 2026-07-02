package br.edu.ifpr.bsi.sistemaclubesoft.services;

import br.edu.ifpr.bsi.sistemaclubesoft.Mapper.TecnicoMapper;
import br.edu.ifpr.bsi.sistemaclubesoft.model.tecnico.Tecnico;
import br.edu.ifpr.bsi.sistemaclubesoft.model.tecnico.TecnicoDetailDTO;
import br.edu.ifpr.bsi.sistemaclubesoft.model.tecnico.TecnicoRequestDTO;
import br.edu.ifpr.bsi.sistemaclubesoft.repositories.TecnicoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class TecnicoService {

    @Autowired
    private TecnicoRepository tecnicoRepository;

    @Autowired
    private TecnicoMapper tecnicoMapper;

    public List<TecnicoDetailDTO> listar(){
        return tecnicoRepository.findAll()
                .stream()
                .map(tecnicoMapper::entityToDetailDTO)
                .toList();
    }

    public TecnicoDetailDTO salvar(TecnicoRequestDTO request){
        Tecnico tecnico = tecnicoMapper.requestDTOToEntity(request);
        return tecnicoMapper.entityToDetailDTO(this.tecnicoRepository.save(tecnico));
    }

    @Transactional
    public TecnicoDetailDTO atualizar(Long codigo, TecnicoRequestDTO request){
        this.tecnicoRepository.findById(codigo).orElseThrow(() ->
                new ResponseStatusException(HttpStatus.NOT_FOUND, "Tecnico não encontrado"));

        Tecnico tecnico = tecnicoMapper.requestDTOToEntity(request);
        tecnico.setCodigo(codigo);
        return tecnicoMapper.entityToDetailDTO(this.tecnicoRepository.save(tecnico));
    }

    @Transactional
    public void excluir(Long codigo){
        Tecnico tecnicoExcluir = this.tecnicoRepository.findById(codigo).orElseThrow(() ->
                new ResponseStatusException(HttpStatus.NOT_FOUND, "Tecnico não encontrado"));
        tecnicoRepository.delete(tecnicoExcluir);
    }
}
