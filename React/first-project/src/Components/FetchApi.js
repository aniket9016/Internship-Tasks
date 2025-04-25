import React from 'react';

class FetchApi extends React.Component {
    state = {
        categories: [],
        loading: true,
        error: null,
    };

    componentDidMount() {
        fetch('https://localhost:7130/api/Category')
            .then((res) => {
                if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
                return res.json();
            })
            .then((data) => this.setState({ categories: data, loading: false }))
            .catch((err) => this.setState({ error: err.message, loading: false }));
    }

    render() {
        const { categories, loading, error } = this.state;

        if (loading) return <p>Loading categories...</p>;
        if (error) return <p>Error: {error}</p>;

        return (
            <div className="categories-container">
                <h2>Categories</h2>
                {categories.length ? (
                    <ul>
                        {categories.map((cat) => (
                            <li key={cat.id}>{cat.categoryName}</li>
                        ))}
                    </ul>
                ) : (
                    <p>No categories found</p>
                )}
            </div>
        );
    }
}

export default FetchApi;
