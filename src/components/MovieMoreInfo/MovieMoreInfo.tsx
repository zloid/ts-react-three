import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Badge, Spinner } from 'react-bootstrap'
// import imgMissing from '../../assets/missing.jpg'
import noImage from '../../assets/no-image-available.jpg'

import {
    fetchMovieMoreInfo,
    selectDefaultPathToPic,
    selectmovieMoreInfoData,
    selectIsMovieMoreInfoLoading,
} from '../../features/movieMoreInfo/movieMoreInfoSlice'

export const MovieMoreInfo: React.FC = () => {
    const dispatch = useDispatch()
    const movieMoreInfoData = useSelector(selectmovieMoreInfoData)
    const defaultPathToPic = useSelector(selectDefaultPathToPic)
    const isMovieMoreInfoLoading = useSelector(selectIsMovieMoreInfoLoading)

    const location = useLocation()
    const locationSearch = location.search.split(':')[1]

    const castOfMovie = movieMoreInfoData?.credits?.cast.map((castItem) => (
        /* castItem.profile_path && */ <Col key={castItem.id}>
            {
                <div>
                    <Badge pill variant="light">
                        {castItem.name}
                    </Badge>
                </div>
            }
            <img
                key={castItem.cast_id}
                // src={defaultPathToPic + castItem.profile_path}
                src={
                    castItem.profile_path !== null
                        ? `${defaultPathToPic + castItem.profile_path}`
                        : `${noImage}`
                }
                style={{
                    width: '120px',
                    height: '120px',
                    marginBottom: '20px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                }}
            ></img>
        </Col>
    ))

    useEffect(() => {
        dispatch(fetchMovieMoreInfo(locationSearch))
    }, [])

    return (
        <>
            <h1>More info about "{movieMoreInfoData.original_title}"</h1>
            {isMovieMoreInfoLoading ? (
                <div
                    style={{
                        position: 'absolute',
                        marginTop: '50px',
                        marginLeft: '20px',
                        zIndex: 1000,
                    }}
                >
                    <Spinner animation="grow" variant="success" />
                </div>
            ) : null}
            <br />
            <Row>
                <Col>
                    <img
                        className="img-fluid"
                        src={
                            movieMoreInfoData.poster_path === null ||
                            movieMoreInfoData.poster_path === undefined
                                ? noImage
                                : defaultPathToPic +
                                  movieMoreInfoData.poster_path
                        }
                        alt={`poster pic of ${movieMoreInfoData.original_title}`}
                        style={{ borderRadius: '5px' }}
                    />
                </Col>

                <Col>
                    <Row>
                        {' '}
                        <Col>
                            <Row>
                                <Col>
                                    {movieMoreInfoData.imdb_id && (
                                        <strong>iMDB id: </strong>
                                    )}
                                    <a
                                        target="_blank"
                                        href={`https://www.imdb.com/title/${movieMoreInfoData.imdb_id}/`}
                                        style={{ textDecoration: 'underline' }}
                                    >
                                        {movieMoreInfoData.imdb_id}
                                    </a>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <strong>Budget:</strong>{' '}
                                    {movieMoreInfoData.budget === 0 ||
                                    movieMoreInfoData.budget === undefined
                                        ? 'unknown'
                                        : `${movieMoreInfoData.budget} $`}
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <strong>Original language:</strong>{' '}
                                    {movieMoreInfoData.original_language}
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    {movieMoreInfoData.release_date !== '' ? (
                                        <span>
                                            <strong>Release date: </strong>
                                            {movieMoreInfoData.release_date}
                                        </span>
                                    ) : (
                                        ''
                                    )}
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    {movieMoreInfoData.backdrop_path === null ||
                    movieMoreInfoData.backdrop_path === undefined ? (
                        ''
                    ) : (
                        <Row>
                            <Col>
                                <br />
                                <img
                                    className="img-fluid"
                                    src={
                                        movieMoreInfoData.backdrop_path ===
                                            null ||
                                        movieMoreInfoData.backdrop_path ===
                                            undefined
                                            ? noImage
                                            : defaultPathToPic +
                                              movieMoreInfoData.backdrop_path
                                    }
                                    alt={`backdrop pic of ${movieMoreInfoData.original_title}`}
                                    style={{ borderRadius: '10px' }}
                                />
                                <br />
                                <br />
                                {movieMoreInfoData.tagline && (
                                    <Badge variant="success">
                                        {movieMoreInfoData.tagline}
                                    </Badge>
                                )}
                            </Col>
                        </Row>
                    )}
                </Col>
            </Row>
            <br />
            <Row>
                <Col>
                    {movieMoreInfoData.overview === '' ||
                        movieMoreInfoData.overview}
                </Col>
            </Row>
            <hr />
            {castOfMovie !== undefined && castOfMovie.length > 0 && (
                <h2>Cast</h2>
            )}{' '}
            <br />
            <Row>{castOfMovie}</Row>
        </>
    )
}
