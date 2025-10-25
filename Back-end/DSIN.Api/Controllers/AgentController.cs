using Microsoft.AspNetCore.Mvc;
using DSIN.Bussiness.Models;
using DSIN.Bussiness.Services;

namespace DSIN.Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AgentController : Controller
    {
        private IAgentService _agentService;
        
        public AgentController(IAgentService agentService)
        {
            _agentService = agentService;
        }
        [HttpGet(Name = "FindAgent")]
        public IActionResult FindAgent(Agent agentDTO)
        {
            Agent agent = _agentService.FindAgent(agentDTO);
            return Ok(agent);
        }
    }
}
