package io.laranibar.ppmtool.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

import javax.validation.Valid;

import io.laranibar.ppmtool.domain.Backlog;
import io.laranibar.ppmtool.domain.Project;
import io.laranibar.ppmtool.domain.ProjectTask;
import io.laranibar.ppmtool.exceptions.ProjectNotFoundException;
import io.laranibar.ppmtool.repositories.BacklogRepository;
import io.laranibar.ppmtool.repositories.ProjectRepository;
import io.laranibar.ppmtool.repositories.ProjectTaskRepository;

@Service
public class ProjectTaskService {

	@Autowired
	private BacklogRepository backlogRepository;
	@Autowired
	private ProjectTaskRepository projectTaskRepository;
	@Autowired
	private ProjectRepository projectRepository;
	@Autowired
	private ProjectService projectService;
	
	public ProjectTask addProjectTask(String projectIdentifier,ProjectTask projectTask,String username) {
		/**
		* ProjectTask to be added to a specific project  
		* If project !=null , Backlog exists 
		**/
		Backlog backlog = projectService.findProjectByIdentifier(projectIdentifier, username).getBacklog();//backlogRepository.findByProjectIdentifier(projectIdentifier);
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
		if(projectTask.getPriority()==null || projectTask.getPriority()==0) {
			projectTask.setPriority(3);
		}
		return projectTaskRepository.save(projectTask);
	}

	public Iterable<ProjectTask> findBacklogById(String id,String username) {
		
		/*Project project = projectRepository.findByProjectIdentifier(id);
		
		if(project==null) {
			throw new ProjectNotFoundException("Project with ID: "+id+" does not exist.");
		}*/
		projectService.findProjectByIdentifier(id, username);
		return projectTaskRepository.findByProjectIdentifierOrderByPriority(id);
	}
	
	public ProjectTask findPTByProjectSequence(String backlog_id,String pt_id,String username) {
		/**
		* make sure we are searching on an existing backlog
		*/
		projectService.findProjectByIdentifier(backlog_id, username);
		/**
		 * Make sure that our task exists
		 */
		ProjectTask projectTask=projectTaskRepository.findByProjectSequence(pt_id);
		if(projectTask==null) {
			throw new ProjectNotFoundException("Project Task "+pt_id+" not found.");
		}
		/**
		 * Make sure that the backlog/project id in the path corresponds to the right project
		 */
		if(!projectTask.getProjectIdentifier().equals(backlog_id)) {
			throw new ProjectNotFoundException("Project Task "+pt_id+" does not exists in project: "+backlog_id);
		}
		return projectTask;
	}
	public ProjectTask updateByProjectSequence(ProjectTask updatedTask,String backlog_id,String pt_id,String username) {
		ProjectTask projectTask=this.findPTByProjectSequence(backlog_id,pt_id,username);		
		
		projectTask=updatedTask;
		
		return projectTaskRepository.save(projectTask);
		
	}
	public void deletePTByProjectSequence(String backlog_id,String pt_id,String username) {
		ProjectTask projectTask=this.findPTByProjectSequence(backlog_id,pt_id,username);		
		
		/*
		Backlog backlog=projectTask.getBacklog();
		List<ProjectTask> pts=projectTask.getBacklog().getProjectTasks();
		pts.remove(projectTask);
		backlogRepository.save(backlog);
		*/
		
		projectTaskRepository.delete(projectTask);
	}
}
