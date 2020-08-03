package io.laranibar.ppmtool.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import io.laranibar.ppmtool.domain.Backlog;
import io.laranibar.ppmtool.domain.ProjectTask;
import io.laranibar.ppmtool.repositories.BacklogRepository;
import io.laranibar.ppmtool.repositories.ProjectTaskRepository;

@Service
public class ProjectTaskService {

	@Autowired
	private BacklogRepository backlogRepository;
	@Autowired
	private ProjectTaskRepository projectTaskRepository;
	
	public ProjectTask addProjectTask(String projectIdentifier,ProjectTask projectTask) {
		/**
		* ProjectTask to be added to a specific project  
		* If project !=null , Backlog exists 
		**/
		Backlog backlog = backlogRepository.findByProjectIdentifier(projectIdentifier);
		/**
		* set the Backlog to the ProjectTask
		*/
		projectTask.setBacklog(backlog);
		/**
		* we want our project sequence to be like this: IDPRO-1
		*/
		Integer BacklogSequence= backlog.getPTSequence();
		/**
		* update the Backlog Sequence
		**/
		BacklogSequence++;
		backlog.setPTSequence(BacklogSequence);
		/**
		 * Add Sequence to Project Task
		 */
		projectTask.setProjectSequence(backlog.getProjectIdentifier()+"-"+BacklogSequence);
		projectTask.setProjectIdentifier(projectIdentifier); 
		/**
		* Initial status when status is null
		*/
		if(projectTask.getStatus()==""||projectTask.getStatus()==null) {
			projectTask.setStatus("TO_DO");
		}
		/**
		* Initial priority when priority is null
		*/
		if(projectTask.getPriority()==null) {
			projectTask.setPriority(3);
		}
		return projectTaskRepository.save(projectTask);
		
	}

	public Iterable<ProjectTask> findBacklogById(String backlog_id) {
		// TODO Auto-generated method stub
		return projectTaskRepository.findByProjectIdentifierOrderByPriority(backlog_id);
	}
}
