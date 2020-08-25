package io.laranibar.ppmtool.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import io.laranibar.ppmtool.domain.Project;


/**
 * Act as a database repository.
 * Indicate that the class provides
 *  the mechanism for storage, retrieval, search, update and delete operation on objects.
 * @author leo
 *
 */
@Repository
public interface ProjectRepository extends CrudRepository<Project, Long>{
  
	Project findByProjectIdentifier(String projectId);
	
	@Override
	Iterable<Project> findAll();
	
	Iterable<Project> findAllByProjectLeader(String username);
}
