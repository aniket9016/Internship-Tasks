using System.Linq;
using System.Threading.Tasks;
using MovieDemo.Models;

namespace MovieDemo.Repositories
{
    public interface IMovieRepository
    {
        IQueryable<Movie> GetAllMovies();
        Task<Movie> GetMovieByIdAsync(int id);
        Task AddMovieAsync(Movie movie);
        Task UpdateMovieAsync(Movie movie);
        Task DeleteMovieAsync(int id);
        Task<List<Movie>> FindMoviesByTitleAsync(string title);
    }
}
