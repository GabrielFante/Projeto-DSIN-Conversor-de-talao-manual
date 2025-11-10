using DSIN.DSIN.Business.DTOs;

namespace DSIN.DSIN.Business.Interfaces.IServices
{

    public interface IAgentService
    {
        Task<LoginResponseDto?> LoginAsync(LoginRequestDto request, CancellationToken ct);
    }
}
