"""  
    get_robust_cov_stats()

    Return all robust covariance estimators.
"""
get_all_robust_cov_stats() = Set([:white, :nw, :hc0, :hc1, :hc2, :hc3])
get_needed_robust_cov_stats(s::String) = return get_needed_robust_cov_stat([s])
get_needed_robust_cov_stats(s::Symbol) = return get_needed_robust_cov_stat(Set([s]))
get_needed_robust_cov_stats(s::Vector{String}) = return get_needed_robust_cov_stats(Symbol.(lowercase.(s)))
get_needed_robust_cov_stats(::Vector{Any}) = return get_needed_robust_cov_stat([:none])
get_needed_robust_cov_stats(::Set{Any}) = return get_needed_robust_cov_stat(Set([:none])) 
get_needed_robust_cov_stats(s::Set{Symbol}) = return get_needed_robust_cov_stat(collect(s)) 

function get_needed_robust_cov_stats(s::Vector{Symbol})
    
    length(s) == 0 && return (nothing, nothing)
    :none in s && return (nothing, nothing)
    
    needed_white::Union{Nothing, Symbol} = :invalid
    needed_hac::Union{Nothing, Symbol} = :invalid
    if :white in s 
        needed_white = :white
    elseif :hc0 in s 
        needed_white = :hc0
    elseif :hc1 in s 
        needed_white = :hc1
    elseif :hc2 in s 
        needed_white = :hc2
    elseif :hc3 in s 
        needed_white = :hc3
    else 
        needed_white= nothing
    end

    if :nw in s
        needed_hac = :nw
    else
        needed_hac = nothing
    end

    return return (needed_white, needed_hac)

end

"""
    get_all_model_stats()

    Returns all statistics availble for the fitted model.
"""
get_all_model_stats() = Set([:coefs, :sse, :mse, :sst, :rmse, :aic, :sigma, :t_statistic, :vif, :r2, :adjr2, :stderror, :t_values, :p_values, :ci])

get_needed_model_stats(req_stats::String) = return get_needed_model_stats([req_stats])
get_needed_model_stats(req_stats::Symbol) = return get_needed_model_stats(Set([req_stats]))
get_needed_model_stats(req_stats::Vector{String}) = return get_needed_model_stats(Symbol.(lowercase.(req_stats)))
get_needed_model_stats(::Vector{Any}) = return get_needed_model_stats([:none])
get_needed_model_stats(::Set{Any}) = return get_needed_model_stats(Set([:none]))
get_needed_model_stats(req_stats::Set{Symbol}) = get_needed_model_stats(collect(req_stats))

"""
    get_needed_model_stats(req_stats::Vector{Symbol})

    return the list of needed statistics given the list of statistics about the model the caller wants.
"""
function get_needed_model_stats(req_stats::Vector{Symbol})
    needed = Set([:coefs, :sse, :mse])
    full = get_all_model_stats()
    unique!(req_stats)

    length(req_stats) == 0 && return needed
    :none in req_stats && return needed
    :all in req_stats && return full

    :sst in req_stats && push!(needed, :sst)
    :rmse in req_stats && push!(needed, :rmse)
    :aic in req_stats && push!(needed, :aic)
    :sigma in req_stats && push!(needed, :sigma)
    :t_statistic in req_stats && push!(needed, :t_statistic)
    :vif in req_stats && push!(needed, :vif)
    
    if :r2 in req_stats
        push!(needed, :sst)
        push!(needed, :r2)
    end
    if :adjr2 in req_stats
        push!(needed, :sst)
        push!(needed, :r2)
        push!(needed, :adjr2)
    end
    if :stderror in req_stats
        push!(needed, :sigma)
        push!(needed, :stderror)
    end
    if :t_values in req_stats
        push!(needed, :sigma)
        push!(needed, :stderror)
        push!(needed, :t_values)
    end
    if :p_values in req_stats
        push!(needed, :sigma)
        push!(needed, :stderror)
        push!(needed, :t_values)
        push!(needed, :p_values)
    end
    if :ci in req_stats
        push!(needed, :sigma)
        push!(needed, :stderror)
        push!(needed, :t_statistic)
        push!(needed, :ci)
    end

    return needed
end

"""
    get_all_prediction_stats()

    get all the available statistics about the values predicted by a fitted model
"""
get_all_prediction_stats() = Set([:predicted, :residuals, :leverage, :stdp, :stdi, :stdr, :student, :rstudent, :lcli, :ucli, :lclp, :uclp, :press, :cooksd])

get_prediction_stats(req_stats::String) = return get_prediction_stats([req_stats]) 
get_prediction_stats(req_stats::Vector{String}) = return get_prediction_stats(Symbol.(lowercase.(req_stats))) 
get_prediction_stats(::Vector{Any}) = return get_prediction_stats([:none])
get_prediction_stats(::Set{Any}) = return get_prediction_stats(Set([:none]))
get_prediction_stats(req_stats::Set{Symbol}) = return get_prediction_stats(collect(req_stats))

"""
    function get_prediction_stats(req_stats::Vector{Symbol})

    return the list of needed statistics and the statistics that need to be presentd given the list of statistics about the predictions the caller wants.
"""
function get_prediction_stats(req_stats::Vector{Symbol})
    needed = Set([:predicted])
    full = get_all_prediction_stats()
    present = Set([:predicted])
    unique!(req_stats)

    length(req_stats) == 0 && return needed, present
    :none in req_stats && return needed, present
    :all in req_stats && return full, full

    :leverage in req_stats && push!(present, :leverage)
    :residuals in req_stats && push!(present, :residuals)
    if :stdp in req_stats
        push!(needed, :leverage)
        push!(present, :stdp)
    end
    if :stdi in req_stats
        push!(needed, :leverage)
        push!(present, :stdi)
    end
    if :stdr in req_stats
        push!(needed, :leverage)
        push!(present, :stdr)
    end
    if :student in req_stats
        push!(needed, :leverage)
        push!(needed, :residuals)
        push!(needed, :stdr)
        push!(present, :student)
    end
    if :rstudent in req_stats
        push!(needed, :leverage)
        push!(needed, :residuals)
        push!(needed, :stdr)
        push!(needed, :student)
        push!(present, :rstudent)
    end
    if :lcli in req_stats
        push!(needed, :leverage)
        push!(needed, :stdi)
        push!(present, :lcli)
    end
    if :ucli in req_stats
        push!(needed, :leverage)
        push!(needed, :stdi)
        push!(present, :ucli)
    end
    if :lclp in req_stats
        push!(needed, :leverage)
        push!(needed, :stdp)
        push!(present, :lclp)
    end
    if :uclp in req_stats
        push!(needed, :leverage)
        push!(needed, :stdp)
        push!(present, :uclp)
    end
    if :press in req_stats
        push!(needed, :residuals)
        push!(needed, :leverage)
        push!(present, :press)
    end
    if :cooksd in req_stats
        push!(needed, :leverage)
        push!(needed, :stdp)
        push!(needed, :stdr)
        push!(needed, :residuals)
        push!(needed, :student)
        push!(present, :cooksd)
    end

    union!(needed, present)

    return needed, present

end

"""
    function encapsulate_string(s)

    (internal) Only used to encapsulate a string into an array.

    used exclusively to handle the function ```StatsBase.coefnames``` which sometime return an array or when there is only one element the element alone. 
"""
function encapsulate_string(s::String)
    return [s]
end

"""
    function encapsulate_string(v)

    (internal) Only used to encapsulate a string into an array.

    used exclusively to handle the function ```StatsBase.coefnames``` which sometime return an array or when there is only one element the element alone. 
"""
function encapsulate_string(v::Vector{String})
    return v
end

import Printf
"""
    macro gprintf(fmt::String)
    
    (internal) used to format with %g

    Taken from message published by user o314 at https://discourse.julialang.org/t/printf-with-variable-format-string/3805/6
"""
macro gprintf(fmt::String)
    :((io::IO, arg) -> Printf.@printf(io, $fmt, arg))
end

"""
    function fmt_pad(s::String, value, pad=0)
    (internal) helper to format and pad string for results display
"""
function fmt_pad(s::String, value, pad=0)
    fmt = @gprintf("%g")
    return rpad(s * sprint(fmt, value), pad)
end

using NamedArrays
"""
    function my_namedarray_print(io::IO, n::NamedArray)

    (internal) Print the NamedArray with the type annotation (on the first line).
"""
function my_namedarray_print(io::IO, n::NamedArray)
    tmpio = IOBuffer()
    show(tmpio, n)
    print(io, split(String(take!(tmpio)), "\n", limit=2)[2])
end

