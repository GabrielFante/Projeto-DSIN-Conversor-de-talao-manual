using DSIN.DSIN.Business.DTOs;

namespace DSIN.DSIN.Business.Interfaces.IServices;

public interface IOcrClient
{
    Task<OcrExternalResultDto> AnalyzeAsync(OcrExternalRequestDto request, CancellationToken ct);
}