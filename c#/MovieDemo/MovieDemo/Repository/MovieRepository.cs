using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using MovieDemo.Models;
using System.Collections.Generic;

namespace MovieDemo.Repositories
{
    public class MovieRepository : IMovieRepository
    {
        private readonly AppDBContext _context;

        public MovieRepository(AppDBContext context)
        {
            _context = context;
        }

        private async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }

        public IQueryable<Movie> GetAllMovies()
        {
            return _context.Movies.AsQueryable();
        }

        public async Task<Movie> GetMovieByIdAsync(int id)
        {
            return await _context.Movies.FindAsync(id);
        }

        public async Task AddMovieAsync(Movie movie)
        {
            var existingMovie = await _context.Movies.AnyAsync(m => m.MovieName.ToLower() == movie.MovieName.ToLower());
            if (existingMovie)
                throw new System.Exception("A movie with the same name already exists.");

            await _context.Movies.AddAsync(movie);
            await SaveChangesAsync();
        }

        public async Task UpdateMovieAsync(Movie movie)
        {
            var existingMovie = await _context.Movies.AnyAsync(m => m.MovieName.ToLower() == movie.MovieName.ToLower() && m.MovieId != movie.MovieId);
            if (existingMovie)
                throw new System.Exception("A movie with the same name already exists.");

            _context.Movies.Update(movie);
            await SaveChangesAsync();
        }

        public async Task DeleteMovieAsync(int id)
        {
            var movie = await _context.Movies.FindAsync(id);
            if (movie != null)
            {
                _context.Movies.Remove(movie);
                await SaveChangesAsync();
            }
        }

        public async Task<List<Movie>> FindMoviesByTitleAsync(string title)
        {
            return await _context.Movies
                .Where(m => m.MovieTitle.ToLower().Contains(title.ToLower()))
                .ToListAsync();
        }
    }
}