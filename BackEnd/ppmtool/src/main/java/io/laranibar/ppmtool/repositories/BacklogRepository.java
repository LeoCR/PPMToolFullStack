package io.laranibar.ppmtool.repositories;

import io.laranibar.ppmtool.domain.Backlog;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BacklogRepository extends CrudRepository<Backlog, Long> {
	Backlog findByProjectIdentifier(String Identifier);
}
