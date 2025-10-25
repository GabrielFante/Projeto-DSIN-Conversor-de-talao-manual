using Microsoft.AspNetCore.Mvc;
using DSIN.Bussiness.Services;
using DSIN.Bussiness.Models;

namespace BackEndDsin.DSIN.Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TicketBookController : Controller
    {
        private ITicketBookService _ticketBookService;

        public TicketBookController(ITicketBookService ticketBookService)
        {
            _ticketBookService = ticketBookService;
        }

        [HttpPost(Name = "CreateTicketBook")]
        public IActionResult CreateTicketBook(TicketBook ticketBookDTO)
        {
            TicketBook ticketBook = _ticketBookService.CreateTicketBook(ticketBookDTO);
            return Ok(ticketBook);
        }
     
    }
}